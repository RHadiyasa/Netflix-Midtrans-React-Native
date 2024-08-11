import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import Header from "./components/Header";
import { connectAxios } from "../lib/axios";
import { useFocusEffect } from "@react-navigation/native";
import midtransClient from "midtrans-client";
import { useSelector } from "react-redux";

const Tickets = () => {
  const user = useSelector((store) => store.user.userData);

  const ticketPrice = 50000; // hardcode harga tiket
  const [tickets, setTickets] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  // Seup Midtrans
  const midtrans = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
  });

  const handlePayment = async () => {
    transactionId = `order-${new Date().getTime()}`;

    try {
      const transactionDetails = {
        transaction_details: {
          order_id: transactionId,
          gross_amount: grandTotal,
        },
        // enabled_payments: ["gopay"],
        item_details: tickets.map((ticket) => ({
          id: ticket.id,
          price: ticketPrice,
          quantity: ticket.quantity,
          name: truncateText(ticket.original_title, 20),
        })),
        customer_details: {
          username: user.username,
          email: user.email,
        },
      };

      const { token } = await midtrans.createTransaction(transactionDetails);
      console.log("Token : ", token);

      Linking.openURL(
        `https://app.sandbox.midtrans.com/snap/v2/vtweb/${token}`
      );

      setTimeout(() => {
        setIsPaymentDone(true);
      }, 5000);
    } catch (error) {
      console.error("Transaction error: ", error);
    }
  };

  const fetchMovies = async () => {
    const axiosInstance = await connectAxios();

    try {
      const response = await axiosInstance.get("/tickets");
      setTickets(response.data);
      calculateGrandTotal(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateGrandTotal = (tickets) => {
    const total = tickets.reduce(
      (sum, ticket) => sum + ticketPrice * ticket.quantity,
      0
    );

    setGrandTotal(total);
  };

  const confirPayment = () => {
    clearTickets();
    setIsPaymentDone(false);
  };

  // Function to clear tickets
  const clearTickets = async () => {
    const axiosInstance = await connectAxios();

    try {
      // Delete each ticket from the server
      for (let ticket of tickets) {
        await axiosInstance.delete(`/tickets/${ticket.id}`);
      }
      // Clear tickets from the state
      setTickets([]);
      setGrandTotal(0);
      Alert.alert("Payment Successfull");
    } catch (error) {
      console.error("Error clearing tickets: ", error);
    }
  };

  // memuat ulang data setiap kembali ke screen
  useFocusEffect(
    React.useCallback(() => {
      fetchMovies();
    }, [])
  );

  console.log("Tickets : ", tickets);

  const handleDelete = async (id) => {
    const axiosInstance = await connectAxios();

    try {
      await axiosInstance.delete(`/tickets/${id}`);
      const updateTickets = tickets.filter((ticket) => ticket.id !== id);
      setTickets(updateTickets);
      calculateGrandTotal(updateTickets);
    } catch (error) {
      console.error(error);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) {
      return text;
    }

    return text.substring(0, maxLength) + "...";
  };

  return (
    <SafeAreaView className="flex-1 bg-black items-center">
      <StatusBar barStyle={"light-content"} />
      <Header />
      <View>
        <Text className="text-white text-xl font-semibold">
          Tickets / Reservation
        </Text>
      </View>
      <ScrollView className="w-full px-10">
        <View>
          {tickets.map((ticket) => (
            <View
              key={ticket.id}
              className="flex-row items-center justify-between mt-5"
            >
              <View className="flex-row items-center justify-start mt-2">
                <Image
                  source={{
                    uri: `https://media.themoviedb.org/t/p/w220_and_h330_face/${ticket.poster_path}`,
                  }}
                  height={100}
                  width={70}
                />
                <View className="flex-col pl-3">
                  <Text className="text-white">
                    {truncateText(ticket.original_title, 20)}
                  </Text>
                  <Text className="text-white">
                    Quantity : {ticket.quantity}
                  </Text>
                  <Text className="text-white">
                    Price : Rp. {ticketPrice * ticket.quantity}
                  </Text>
                </View>
              </View>
              <View>
                <Button
                  color={"red"}
                  title="Delete"
                  onPress={() => handleDelete(ticket.id)}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="items-center mb-10">
        <Text className="text-white font-bold text-xl py-3">
          Grand Total : Rp. {grandTotal}
        </Text>
        <View className="flex-row" style={{ gap: 10 }}>
          <Button
            title="Make Payment"
            color={"green"}
            onPress={handlePayment}
          />
          {isPaymentDone ? (
            <Button
              title="Confirm Payment"
              color={"blue"}
              onPress={confirPayment}
            />
          ) : (
            ""
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Tickets;
