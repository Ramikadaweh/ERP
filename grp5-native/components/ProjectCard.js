import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Projectcard = (props) => {
  var dateObj = new Date(props.date);
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  let newdate = year + "/" + month + "/" + day;
  return (
    <View style={styles.projectcard}>
      <View style={styles.projectCardView1}>
        {/* <Text style={styles.projectCardH}>Empployee name:</Text> */}
        <Text style={styles.projectCardH}>Project name:</Text>
        <Text style={styles.projectCardH}>Role:</Text>
        <Text style={styles.projectCardH}>Start date:</Text>
      </View>
      <View style={styles.projectCardView2}>
        {/* <Text>{props.name || "Name"}</Text> */}
        <Text>{props.projectName || "Project name"}</Text>
        <Text>{props.role || "Role"}</Text>
        <Text>{newdate || "Start date"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  projectcard: {
    backgroundColor: "white",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "4%",
    paddingTop: 20,
    paddingBottom: 20,
  },
  projectCardView2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "50%",
    marginLeft: "5%",
  },
  projectCardView1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "50%",
  },
  projectCardH: {
    color: "#bbb",
  },
});

export default Projectcard;
