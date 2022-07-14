import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
} from "react-native";
import React, { useContext } from "react";

import { AuthContext } from "../components/context";

const Welcome = ({ navigation }) => {
  // get the functions from app.js
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={{ width: 100, position: "absolute", right: 0 }}>
        <Button
          title="Logout"
          onPress={() => {
            signOut();
          }}
        ></Button>
      </View>
      <Text style={styles.Welcome}>Welcome</Text>
      <View style={styles.mainContainer}>
        <TouchableHighlight
          style={{ width: "60%", marginTop: 40, borderRadius: 20 }}
          onPress={() => {
            navigation.navigate("evaluate_kpi");
          }}
        >
          <View style={styles.kpi}>
            <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>
              Evaluate KPIs
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={{ width: "60%", marginTop: 40, borderRadius: 20 }}
          onPress={() => {
            navigation.navigate("generate_reports");
          }}
        >
          <View style={styles.reports}>
            <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>
              Generate Report
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
  },
  Welcome: {
    color: "#fff",
    fontSize: 40,
    marginLeft: 15,
  },
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  kpi: {
    paddingTop: "15%",
    paddingBottom: "15%",
    color: "#fff",
    backgroundColor: "#B82381",
    borderRadius: 20,
  },
  reports: {
    paddingTop: "15%",
    paddingBottom: "15%",
    color: "#fff",
    backgroundColor: "#618ccd",
    borderRadius: 20,
  },
});
