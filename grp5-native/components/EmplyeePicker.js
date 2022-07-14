// CALLBACK FUNCTION "getSelectedValue" to get data of the employee id:
//getSelectedValue={(value) => {}}

import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import FetchURL from "../url";

const EmplyeePicker = (props) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [employees, setEmployees] = useState([]);
  let url = FetchURL.fetchUrl;

  function getdata() {
    fetch(`${url}/api/employee`)
      .then((response) => response.json())
      .then((response) => {
        setEmployees(response.data);
        //send a call to parent when fetching data is done
        props.fetched && props.fetched("loaded");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <View style={styles.pickerWrapper}>
      <Picker
        itemStyle={{ height: 70, color: "white" }}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          props.getSelectedValue && props.getSelectedValue(itemValue);
          props.handleChange && props.handleChange(true);
        }}
        style={styles.picker}
      >
        <Picker.Item label="-Please select an employee-" value="Unknown" />
        {employees &&
          employees.map((employee) => {
            return (
              <Picker.Item
                key={employee.id}
                label={`${employee.emp_first_name} ${employee.emp_last_name}`}
                value={employee.id}
              />
            );
          })}
      </Picker>
    </View>
  );
};

export default EmplyeePicker;

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
