import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import ProgressBar from "./components/ProgressBar";
import OverAll from "./screens/OverAll";
import IndividualKPI from "./screens/IndividualKPI";
import ProjectReport from "./screens/ProjectReport";
import ReportScreen from "./screens/ReportScreen";
import EvaluateKpi from "./screens/EvaluateKpi";
import Welcome from "./screens/Welcome";
import Login from "./screens/LoginScreens";
import { useState } from "react";
import React from "react";

import { AuthContext } from "./components/context";
import axios from "axios";
import FetchUrl from "./url";

export default function App() {
  const url = FetchUrl.fetchUrl;

  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(null);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const authContext = {
    signIn: (e, userName, password) => {
      setError(false);
      setNetworkError(false);
      setIsLoading(true);
      const data = {
        full_name: userName,
        password,
      };
      axios
        .post(`${url}/api/admin/login/login`, data)
        .then((response) => {
          if (response.status == 200) {
            setUserName(userName);
            setAuth(response.data.token);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            console.dir(err);
            setIsLoading(false);
            setNetworkError(true);
          }
          if (err.message === "Request failed with status code 400") {
            console.dir(err);
            setIsLoading(false);
            setError(true);
          }
        });
    },
    signOut: () => {
      setAuth(null);
    },
  };

  const Stack = createNativeStackNavigator();
  const myTheme = {
    colors: {
      background: "#090920",
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={myTheme}>
        {auth && (
          <Login
            sigingIn={isLoading}
            error={error}
            networkError={networkError}
          />
        )}

        {!auth && (
          <Stack.Navigator
            initialRouteName="ERP SYSTEM"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#090920",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen name="ERP SYSTEM" component={Welcome} />
            <Stack.Screen name="Evaluation" component={EvaluateKpi} />
            <Stack.Screen
              name="evaluate_kpi"
              component={EvaluateKpi}
              options={{ title: "Evaluate KPIs" }}
            />
            <Stack.Screen
              name="generate_reports"
              component={ReportScreen}
              options={{ title: "Generate Reports" }}
            />
            <Stack.Screen
              name="emp_report"
              component={ProjectReport}
              options={{ title: "Project history" }}
            />
            <Stack.Screen
              name="emp_report1"
              component={OverAll}
              options={{ title: "Overall KPI" }}
            />
            <Stack.Screen
              name="emp_report2"
              component={IndividualKPI}
              options={{ title: "Individual KPI" }}
            />
          </Stack.Navigator>
        )}

        <StatusBar style="light" />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#090920",
  },
  mainContainer: {
    width: "90%",
    marginLeft: "5%",
    marginTop: "20%",
  },
});
