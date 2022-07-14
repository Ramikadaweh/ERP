import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../components/context";

const LoginScreens = (props) => {
  const { signIn } = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          display: "flex",
        }}
      >
        <Image source={require("../assets/logo.png")} />
        <Text style={styles.title}>Codi ERP</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={(username) => setUserName(username)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={(e) => {
            signIn(e, userName, password);
            
          }}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        {props.sigingIn && (
          <View>
            <Text style={{ color: "rgb(151 ,210,226)", marginBottom: 5 }}>
              Logging In ...
            </Text>
            <ActivityIndicator color={"rgb(151 ,210,226)"} size="large" />
          </View>
        )}
        {props.error && (
          <Text style={{ color: "yellow" }}>Invalid username or passowrd</Text>
        )}
        {props.networkError && (
          <Text style={{ color: "yellow" }}>
            Network Error. Please try again later
          </Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090920",
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "rgb(151 ,210,226)",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    marginBottom: "10%",
    fontSize: 50,
    // fontFamily: "Roboto",
    color: "#fff",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: "5%",
    backgroundColor: "rgba(255, 20, 147, 0.6)",
  },
});
