import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoadingDots from "react-native-loading-dots";

const LoadingIndicator = () => {
  return (
    <View style={styles.loadingWrapper}>
      <View style={styles.loadingView}>
        <LoadingDots
          dots={3}
          colors={["#9E3DBA", "#3940D8", "#B82381"]}
          size={15}
          bounceHeight={30}
        />
      </View>
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  loadingWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingView: {
    height: "100%",
    width: "15%",
    display: "flex",
    justifyContent: "center",
  },
});
