// CALLBACK FUNCTION "getSelectedValue" to get data of the employee id:
//getSelectedValue={(value) => {}}

import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

const KPIsPicker = (props) => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <View style={[styles.pickerWrapper, props.style]}>
      <Picker
        itemStyle={{ height: 70, color: "white" }}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          //to send the id to parent
          props.getSelectedValue && props.getSelectedValue(itemValue);
          //to send the name to parent
          props.getSelectedLabel &&
            props.kpis[itemIndex - 1] &&
            props.getSelectedLabel(props.kpis[itemIndex - 1].kpi_name);
        }}
        style={styles.picker}
      >
        <Picker.Item label="-Please select a Kpi-" value="Unknown" />
        {props.kpis &&
          props.kpis.map((kpi) => {
            return (
              <Picker.Item
                key={kpi.id}
                label={`${kpi.kpi_name}`}
                value={kpi.id}
              />
            );
          })}
      </Picker>
    </View>
  );
};

export default KPIsPicker;

const styles = StyleSheet.create({
  picker: {
    textAlign: "left",
    color: "#fff",
    backgroundColor: "#9E3DBA",
    height: "auto",
  },
  pickerWrapper: {
    width: "100%",
    justifyContent: "center",
    borderColor: "#fff",
    borderRadius: 40,
    height: "auto",
  },
});
