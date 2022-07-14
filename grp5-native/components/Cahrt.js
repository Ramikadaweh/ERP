import { View, StyleSheet, Text, Alert, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import React, { useState, useEffect } from "react";

const Chart = ({ kpiName, history }) => {
  const screenWidth = Dimensions.get("window").width;
  let evaluationArray = [0];
  let datesArray = [""];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (history.length != 0) {
    evaluationArray = [];
    datesArray = [];
    history.map((item) => {
      evaluationArray.push(item.evaluation * 10);
      let newDate = new Date(item.created_at).getMonth();
      newDate = monthNames[newDate];
      datesArray.push(newDate);
    });
    if (evaluationArray.length == 1) {
      evaluationArray = [0, ...evaluationArray];
      datesArray = [...datesArray, ...datesArray]
    }
  }

  const chartData = {
    labels: datesArray,
    datasets: [
      {
        data: evaluationArray,
        // data: [30, 20, 40, 40, 50, 90],
        color: (opacity = 1) => "#ECEFF1", // optional
        strokeWidth: 3, // optional
      },
    ],
    legend: [` ${kpiName || "Kpi"}`], // optional
  };

  if (!history)
    return (
      <View>
        <Text style={{ color: "white" }}>There is no data to show</Text>
      </View>
    );

  if (history) {
    return (
      <View style={styles.MainContainer}>
        <LineChart
          withScrollableDot={true}
          data={chartData}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#183086",
            backgroundGradientTo: "#183086",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 255) => "#ECEFF1",
            // linejoinType: "round",

            scrollableDotFill: "#fff",
            scrollableDotRadius: 10,
            scrollableDotStrokeColor: "red",
            scrollableDotStrokeWidth: 2,

            scrollableInfoViewStyle: {
              justifyContent: "center",
              alignContent: "center",
              backgroundColor: "#121212",
              borderRadius: 10,
            },
            scrollableInfoTextStyle: {
              color: "#C4C4C4",
              marginHorizontal: 4,
              flex: 1,
              textAlign: "center",
            },
            scrollableInfoSize: { width: 65, height: 30 },
            scrollableInfoOffset: 15,
          }}
          yAxisLabel={"% "}
          style={{ marginLeft: 5, marginRight: 5, borderRadius: 7 }}
          bezier
        />

        {/* <Text style={{ fontSize: 28, textAlign: "center", color: "white" }}>
          LineChart in React Native
        </Text> */}
      </View>
    );
  }
};

export default Chart;

const styles = StyleSheet.create({
  MainContainer: {
    // marginTop: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
  },
});
