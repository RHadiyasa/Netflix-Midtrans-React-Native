import React from "react";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { ApplicationProvider } from "@ui-kitten/components";
import { reducer } from "./store/store";
import { Provider } from "react-redux";
import { createStore } from "redux";
import DrawerNavigator from "./navigation/DrawerNavigator";

const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          {/* Wrapping Screen ke dalam AppNavigator */}
          {/* <AppNavigator /> */}
          <DrawerNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}
