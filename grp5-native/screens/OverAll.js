import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
  Easing,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import EmplyeePicker from "../components/EmplyeePicker";
import ProgressBar from "../components/ProgressBar";
import axios from "axios";
import FetchURL from "../url";
import LoadingIndicator from "../components/LoadingIndicator";

const OverAll = () => {
  // const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(false);
  const [kpis, setkpis] = useState([]);
  const [stateId, setStateId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dataIsLoading, setDataIsLoading] = useState(false);

  //Animation variables
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  let url = FetchURL.fetchUrl;
  function getdata() {
    setDataIsLoading(true);
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
    console.log(stateId);
    axios
      .get(`${url}/api/employee/${stateId}`)
      .then((response) => {
        console.log(response.data.data.kpi);
        setkpis(response.data.data.kpi);
        response.data.data.kpi.length == 0 ? setError(true) : setError(false);
        setDataIsLoading(false);

        //stop animation
        Animated.timing(spinAnim).stop();
        //reset the animation
        setSpinAnim(new Animated.Value(0));
      })
      .catch((err) => console.log(err));
  }

  return (
    <View style={{ height: "100%" }}>
      {isLoading && <LoadingIndicator />}
      <EmplyeePicker
        fetched={(state) => {
          if (state === "loaded") {
            setIsLoading(false);
          }
        }}
        getSelectedValue={(id) => {
          setStateId(id);
        }}
      />
      {error && (
        <Text
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "50%",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          There's no data to show
        </Text>
      )}
      {dataIsLoading && <LoadingIndicator />}
      {!dataIsLoading && (
        <FlatList
          style={{ marginTop: "5%" ,width:"90%",marginLeft:"5%"}}
          data={kpis}
          renderItem={({ item }) => (
            <ProgressBar
              name={item.kpi_name}
              percentage={item.pivot.evaluation_kpi * 10 + "%"}
              backgroundColor="white"
            ></ProgressBar>
          )}
        ></FlatList>
      )}

      <TouchableHighlight style={styles.clickableImage} onPress={getdata}>
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
};

export default OverAll;

const styles = StyleSheet.create({
  clickableImage: {
    position: "absolute",
    bottom: 20,
    right: 0,
    borderRadius: 50,
    height: "auto",
  },
  clickableDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
