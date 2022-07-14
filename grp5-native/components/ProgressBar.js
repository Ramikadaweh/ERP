import React, { useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const ProgressBar = ({
  navigation,
  percentage,
  height,
  backgroundColor,
  completedColor,
  name,
}) => {
    const [getname, setName] = useState(name);
  const [getPercentage, setPercentage] = useState(percentage);
  const [getheight, setHeight] = useState(20);
  const [getBackgroundColor, setBackgroundColor] = useState(backgroundColor);
  const [getCompletedColor, setCompletedColor] = useState("#4A85C6");
  return (
    <View>
      
      <View style={{ justifyContent: "center" }}>
      <Text style={{
             color:'white',fontWeight:'bold',fontSize:19}}>{getname}</Text>
        <View
          style={{
            width: "100%",
            height: getheight,
            marginVertical: 10,
            borderRadius: 5,
            borderColor: getBackgroundColor,
            borderWidth: 1,
          }}
        />
        <View
          style={{
            width: getPercentage ? getPercentage : 0,
            height: getheight,
            marginVertical: 10,
            borderRadius: 5,
            backgroundColor: getCompletedColor,
            position: "absolute",
            bottom: 20,
          }}
        />
        <View
          style={{
            width: getPercentage ? getPercentage : 0,
            height: getheight,
            bottom: 10,
          }}
        >
          <Text style={{ textAlign: "right", color: "white" }}>
            {getPercentage}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default ProgressBar;
