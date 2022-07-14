import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Animated,
  Easing,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import FetchURL from "../url";
import axios from "axios";
import Projectcard from "../components/ProjectCard";
import EmployeePicker from "../components/EmplyeePicker";
import LoadingIndicator from "../components/LoadingIndicator";

export default function ProjectReport() {
  let url = FetchURL.fetchUrl;
  const [selectedValue, setSelectedValue] = useState("");
  const [employees, setEmployees] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataIsLoading, setDataIsLoading] = useState(false);

  //Animation variables
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const generateReport = async () => {
    //checks if the user entered values
    if (selectedValue === "Unknown") {
      setError(true);
      return;
    }
    setError(false);
    setDataIsLoading(true);
    // start animation
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    let response = await axios.post(`${url}/api/project/test/history`, {
      employee_id: selectedValue,
    });
    try {
      if (response.data.length == 0) setError(true);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }

    setDataIsLoading(false);

    //stop animation
    Animated.timing(spinAnim).stop();
    //reset the animation
    setSpinAnim(new Animated.Value(0));
  };

  const renderItem = ({ item }) => (
    <Projectcard
      key={item.id}
      name={item.emp_id}
      projectName={item.project_name}
      role={item.role_name}
      date={item.created_at}
    />
  );

  return (
    <View style={styles.projectWrapper}>
      {isLoading && <LoadingIndicator />}
      <EmployeePicker
        getSelectedValue={(value) => {
          setSelectedValue(value);
        }}
        handleChange={() => {
          setData([]);
        }}
        fetched={(state) => {
          if (state === "loaded") setIsLoading(false);
        }}
      />
      <View style={styles.projectTable}>
        {error && (
          <Text style={{ color: "white" }}>There's no data to show</Text>
        )}

        {dataIsLoading && <LoadingIndicator />}
        {!dataIsLoading && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>

      {/* to make the image clickable */}
      <TouchableHighlight
        style={styles.clickableImage}
        onPress={generateReport}
      >
        <View style={styles.clickableDiv}>
          <Text style={{ color: "#fff", marginRight: 8 }}>Generate report</Text>
          <Animated.Image
            source={require("../images/addIcon.png")}
            style={{
              transform: [{ rotate: spin }],
              width: 50,
              height: 50,
              resizeMode: "contain",
            }}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  projectWrapper: {
    height: "100%",
    width: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  addIconImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  clickableImage: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 50,
    height: "auto",
  },
  clickableDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  projectTable: {
    width: "90%",
    display: "flex",
    marginTop: 20,
    marginBottom: 150,
    alignItems: "center",
    height: "auto",
  },
});
