import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ReportCard = (props) => {
  return (
    <View style={styles.reportCard}>
      <Text style={[styles.reportCardH, styles.reportText]}>
        {props.title || "Title"}
      </Text>
      <Text style={[styles.reportText]}>
        {props.description}
      </Text>
      {/* <Text style={[styles.reportText]}>{props.type || "type"}</Text> */}
    </View>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  reportCard: {
    backgroundColor: "#618ccd",
    height: '29%',
    width: 200,
    padding: 10,
    borderRadius: 7,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  reportCardH: {
    fontSize: 18,
    flex: 2,
  },
  reportText: {
    color: "#fff",
  },
});
