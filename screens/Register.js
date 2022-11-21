import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { app } from "./FirebaseDB";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    const auth = getAuth();
    const dbRef = app.firestore().collection("User");
    if (username === "" || password === "") {
      alert("Please fill all input");
      return false;
    } else if (username.includes("it.kmitl.ac.th") == false) {
      alert("Only sign up with it.kmitl.ac.th");
      return false;
    } else {
      createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dbRef
            .add({
              username: username,
              role: "user",
            })

            .catch((err) => {
              console.log(err);
            });
          navigation.navigate("Login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("อีเมลล์นี้ถูกใช้งานไปเเล้ว");
          console.log(errorMessage);
          // ..
        });
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.appName}>
        <Text style={styles.appText}>Rubjob🪐</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email 📧 :"
          style={styles.input}
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          placeholder="Password 🔑 :"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={{ textAlign: "center" }}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.gobackText}>Go back to login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CFF5E7",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#A0E4CB",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  appName: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  appText: {
    fontSize: 45,
    fontWeight: "800",
    color: "#0E5E6F",
  },
  gobackText: {
    fontSize: 10,
    color: "#59C1BD",
    marginTop: "13%",
  },
});
export default Register;
