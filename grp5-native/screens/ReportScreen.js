import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableHighlight,
} from "react-native";
import React from "react";
import ReportCard from "../components/ReportCard";

const ReportScreen = ({ navigation }) => {
  const reportsLinks = [
    {
      title: "Employee Project Report",
      description: "",
      link: "emp_report",
      type: "project_report",
    },
    {
      title: "Employee KPI Report",
      description: "Overall KPI list with current values",
      link: "emp_report1",
      type: "Overall_KPI",
    },
    {
      title: "Employee KPI Report",
      description: "Individual KPI change over time with graph",
      link: "emp_report2",
      type: "Individual_kpi",
    },
  ];
  return (
    <View style={styles.reportsContainer}>
      <Text style={styles.header}>Generate a report: </Text>
      <View style={styles.reportsCardContainer}>
        {reportsLinks.map((report) => {
          return (
            <TouchableHighlight
            style={{margin: 10}}
              key={report.link}
              onPress={() => {
                navigation.navigate(report.link);
              }}
            >
              <ReportCard
                title={report.title}
                description={report.description}
                type={report.type}
              />
            </TouchableHighlight>
          );
        })}
      </View>
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  reportsContainer: {
    width: "100%",
    height: "100%",
  },
  header: {
    color: "#fff",
    fontSize: 25,
    margin: 10,
  },
  reportsCardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
