import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from "react-native";
import React, { useState } from "react";
import EmplyeePicker from "../components/EmplyeePicker";
import axios from "axios";
import Fetchurl from "../url";
import KPIsPicker from "../components/KPIsPicker";
import Chart from "../components/Cahrt";
import LoadingIndicator from "../components/LoadingIndicator";

const IndividualKPI = () => {
  const url = Fetchurl.fetchUrl;
  const [employeeId, setEmployeeId] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [kpiId, setKpiId] = useState("");
  const [kpiName, setKpiName] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [chartIsLoading, setChartIsLoading] = useState(false);

  const getEmployee = (id) => {
    setEmployeeId(id);
    axios
      .get(`${url}/api/employee/${id}`)
      .then((response) => {
        setKpis(response.data.data.kpi);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getResult = () => {
    //checks if the user entered values
    if (employeeId === "Unknown" || kpiId === "Unknown") {
      setError(true);
      return;
    }

    setError(false);
    setChartIsLoading(true);

    //start request
    axios
      .post(`${url}/api/history/search`, {
        employee_id: employeeId,
        kpi_id: kpiId,
      })
      .then((response) => {
        if (response.data.length == 0) setError(true);
        setData(response.data);
        setChartIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!false)
    return (
      <View style={styles.IndividualKPIContainer}>
        {isLoading && <LoadingIndicator />}

        <EmplyeePicker
          getSelectedValue={(id) => {
            getEmployee(id);
          }}
          fetched={(state) => {
            console.log(state);
            if (state === "loaded") setIsLoading(false);
          }}
        />
        <KPIsPicker
          kpis={kpis}
          getSelectedLabel={(kpiName) => {
            setKpiName(kpiName);
            setData([]);
          }}
          getSelectedValue={(kpiId) => {
            setKpiId(kpiId);
          }}
          style={styles.kpisPicker}
        />
        {error && (
          <View style={styles.errorView}>
            <Text style={{ color: "white" }}>There's no data to show</Text>
          </View>
        )}

        <TouchableHighlight style={styles.clickableImage} onPress={getResult}>
          <View style={styles.clickableDiv}>
            <Text style={{ color: "#fff", marginRight: 8 }}>
              Generate report
            </Text>
            <Image
              source={require("../images/addIcon.png")}
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
              }}
            />
          </View>
        </TouchableHighlight>

        {data && (
          <View style={styles.chartView}>
            {chartIsLoading && <LoadingIndicator />}
            {!chartIsLoading && data.length != 0 && (
              <Chart kpiName={kpiName} history={data} />
            )}
          </View>
        )}
      </View>
    );
};

export default IndividualKPI;

const styles = StyleSheet.create({
  IndividualKPIContainer: {
    height: "100%",
  },
  clickableImage: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 50,
    height: "auto",
    zIndex:10,
  },
  clickableDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  chartView: {
    height: "70%",
  },
  kpisPicker: {
    marginTop: 10,
  },
  errorView: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
