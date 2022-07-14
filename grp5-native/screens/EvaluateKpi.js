import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Easing, TouchableHighlight, Image, Animated, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Picker } from "@react-native-picker/picker";
import FetchURL from "../url";
import EmplyeePicker from '../components/EmplyeePicker';
import axios from "axios";
import { ProgressBar, Colors } from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';
const EvaluateKpi = () => {
  let url = FetchURL.fetchUrl;
  const [employees, setEmployee] = useState([]);
  const [kpi, setKpi] = useState("");
  const [kpiExist, setKpiExist] = useState(false)
  const [newEvaluation, setNewEvaluation] = useState("");
  const [oneEmployee, setOneEmployee] = useState("");
  const [allKpis, setAllKpi] = useState([]);
  const [error, setError] = useState(false);
  const [idEmployee, setIdEmployee] = useState("");
  const [newKpi, setNewKpi] = useState("");
  const [newKpiEvaluation, setNewKpiEvaluation] = useState("");
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(true);
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const renderItem = ({ item }) => (
    <View >
      <Text style={{ color: "white"}}>{item.kpi_name}</Text>
      <ProgressBar progress={item.pivot && ((item.pivot['evaluation_kpi']) / 10)} color='#B82381' style={styles.progressBar} animated={true} borderRadius={4} />
      <Text style={{ color: "white", textAlign: "center" }}>{item.pivot && ((item.pivot['evaluation_kpi']) * 10)}%</Text>
    </View>
  )


  const getData = async () => {
    setDataIsLoading(true);

    await axios.get(`${url}/api/employee`, { crossdomain: true }).then(response => {
      setEmployee(response.data.data);
    });
    setDataIsLoading(false);

  }
  const getOneEmployee = () => {
    setError(false)
    setDataIsLoading(true);
    let id = idEmployee;
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
    axios.get(`${url}/api/employee/${id}`, { crossdomain: true }).then(response => {
      if (response.data.data.kpi.length == 0) {
        setError(true)
      } else {
        setKpiExist(true)
      }
      setOneEmployee(response.data.data);
      setDataIsLoading(false);
      //stop animation
      Animated.timing(spinAnim).stop();
      //reset the animation
      setSpinAnim(new Animated.Value(0));
      console.log(id);
      // {
      //   oneEmployee.kpi && oneEmployee.kpi.map((data, index) => {
      //     console.log(data.kpi_name)
      //   })
      // }
    });
    console.log();

  }
  const getAllKpis = async () => {
    await axios.get(`${url}/api/kpi`, { crossdomain: true }).then(response => {
      setAllKpi(response.data.data);

    });
  }
  const evaluation = async () => {
    setDataIsLoading(true);
    try {
      await axios.post(`${url}/api/employee/evaluation/${oneEmployee.id}`, { kpi_id: kpi, evaluation: newEvaluation }, { crossdomain: true })
      getOneEmployee();
    }
    catch (error) {
      console.log(error)
    }
    setDataIsLoading(false)
  }
  const attachKpi = async () => {
    let id = idEmployee;
    let newkpi = newKpi;
    let newEval = newKpiEvaluation;
    if (newKpi === "Unknown" || parseInt(newEval) > 10) {
      setError(true);
      return;
    }
    setError(false);
    setDataIsLoading(true);
    try {
      axios.post(`${url}/api/employee/attach-kpi/${id}`, { kpi_id: newkpi, evaluation: newEval });
      setKpiExist(true);
     
    }
    catch (error) {
      console.log(error)
    }
    setDataIsLoading(false);
    getOneEmployee();
  }

  const fakedata = [{ id: 1, name: 'anass' }, { id: 2, name: 'rima' }]
  useEffect(() => {
    getData();
    getAllKpis();
  }, []);

  return (
    <View style={styles.kpiWrapper}>
      <View>
        {isLoading && <LoadingIndicator />}
        <EmplyeePicker getSelectedValue={(id) => {
          setIdEmployee(id)

        }}
          fetched={(state) => {
            if (state === "loaded") setIsLoading(false);
          }} />
        <View style={{ marginTop: 10, marginBottom: 10, width: "94%", marginLeft: "3%", marginRight: "3%" }}>
          {
            oneEmployee.kpi &&

            <View style={styles.evaluateNewKpi}>
              <View style={styles.employeeNewKpi}>

                <Picker itemStyle={{ height: 40, color: "white", }}
                  selectedValue={newKpi}
                  onValueChange={(itemValue, itemIndex) => {
                    setNewKpi(itemValue);
                  }}
                  style={styles.picker} >
                  <Picker.Item label="-Please select a kpi" value="Unknown" />
                  {allKpis.map((data, index) => {
                    return (
                      <Picker.Item key={index} label={data.kpi_name} value={data.id} />
                    )

                  })}

                </Picker>
              </View>

              <View>
                <TextInput style={styles.input}
                  onChangeText={evaluation => setNewKpiEvaluation(evaluation)}
                />
              </View>
              <View style={styles.newEvaliationBtn}
              >
                <TouchableHighlight onPress={attachKpi}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Image source={require("../images/addIcon.png")}
                      style={{
                        width: 30,
                        height: 30,
                      }}
                    />
                    <Text style={{ color: '#fff', marginLeft: 8 }}>Attach Kpi</Text>

                  </View>
                </TouchableHighlight>
              </View></View>}
          {error && (
            <Text style={{ color: "white" }}>There's no data to show</Text>
          )}
          {kpiExist &&
            <View>
              <Text style={{ color: "#fff" }}>All kpi</Text>
            
                <View style={{ borderWidth: 1, borderColor: '#fff', padding: 10, marginTop: 10 }}>
                  <FlatList
                    data={oneEmployee.kpi}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={{
                      paddin: 10, height: "40%"
                      // ,
                    }}
                  />
                </View>
              <View style={styles.evaluateKpi}>


                <View style={styles.employeeKpi}>
                  <Text style={{ color: "#fff", marginBottom: 10 }}>evaluate kpi </Text>
                  <Picker itemStyle={{ height: 40, color: "white", }}
                    selectedValue={kpi}
                    onValueChange={(itemValue, itemIndex) => {
                      setKpi(itemValue);
                    }}
                    style={styles.picker} >
                    <Picker.Item label="-Please select a kpi" value="Unknown" />
                    {oneEmployee.kpi && oneEmployee.kpi.map((data, index) => {
                      return (
                        <Picker.Item key={index} label={data.kpi_name} value={data.id} />
                      )
                    })}
                  </Picker>
                </View>
                <View style={styles.newEvaliationBtn}>
                  <View style={styles.inpuNewKpi}>
                    <TextInput style={styles.input}
                      onChangeText={evaluation => setNewEvaluation(evaluation)}
                      defaultValue={newEvaluation} />
                  </View>
                </View>
                <View style={styles.chekedIcon}
                >
                  <TouchableOpacity style={styles.evaliationBtn_click} onPress={evaluation}>

                    <Image source={require("../images/checked.png")}
                      style={{
                        width: 30,
                        height: 30,
                      }}
                    />
                    <Text style={{ color: '#fff', marginLeft: 8 }}>evaluate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>}
        </View>
      </View>
      <TouchableHighlight
        style={styles.clickableImage}
        onPress={getOneEmployee}
      >
        <View style={styles.clickableDiv}>
          <Text style={{ color: "#fff", marginRight: 8 }}>All KPIs</Text>
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
  )
}

export default EvaluateKpi

const styles = StyleSheet.create({
  employeePicker: {
    width: "100%",
    justifyContent: "center",
    borderColor: "#fff",
    borderRadius: 40,
  },
  picker: {
    width: "100%",
    textAlign: "center",
    color: "#000",
    backgroundColor: "#8ca6db",
  },
  clickableImage: {
    position: "absolute",
    bottom: 10,
    right: "3%",
    borderRadius: 50,
    height: "auto",
  },
  clickableDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  kpiWrapper: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
  input: {
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#fff",
    height: 30,
    color: '#fff',
    paddingLeft:10
  },
  progressBar: {
    height: 20,
  },
  evaluateKpi: {
    marginTop: 20,
    width: "55%",
  },
  evaliationBtn: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  evaliationBtn_click: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})