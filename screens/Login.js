import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  Pressable,
} from "react-native";
import { app } from "./FirebaseDB";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getDocs,
  collection,
  query,
  where,
  getFirestore,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setRole } from "../redux/setRole";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [answer, setAnswer] = useState("");
  let userInfo = [];
  const { user, role } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const handleSignUp = () => {
    navigation.navigate("Register");
  };

  const handleLogin = () => {
    const auth = getAuth();
    //Debug
    // console.log(auth.currentUser);
    const firestore = getFirestore(app);
    if (username === "" || password === "") {
      alert("Please enter username and password correctly!");
      return false;
    } else {
      signInWithEmailAndPassword(auth, username, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          const usernameAndRole = [];

          const q = query(
            collection(firestore, "User"),
            where("username", "==", username)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const { username, role } = doc.data();
            usernameAndRole.push({
              username: username,
              role: role,
            });
            //Debug
            // console.log(doc.data(), typeof doc.data());
            // console.log(usernameAndRole);
            userInfo = usernameAndRole;
          });
          console.log(userInfo);
          dispatch(setUser(userInfo[0].username));
          dispatch(setRole(userInfo[0].role));

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };
  const resetPassword = async () => {
    if (username === "" || answer === "") {
      alert("Please fill all input");
      return false;
    } else {
      const firestore = getFirestore(app);
      const usernameAndRole = [];
      const q = query(
        collection(firestore, "User"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const { username, role, resetPassWordQuestion } = doc.data();
        usernameAndRole.push({
          username: username,
          role: role,
          resetPassWordQuestion: resetPassWordQuestion,
        });
        //Debug
        // console.log(doc.data(), typeof doc.data()), doc.id;
        // console.log(usernameAndRole);
        userInfo = usernameAndRole;
        // console.log(userInfo);
      });
      if (
        userInfo.length != 0 &&
        answer === userInfo[0].resetPassWordQuestion
      ) {
        console.log("Match");
        const auth = getAuth();
        sendPasswordResetEmail(auth, username)
          .then(() => {
            // Password reset email sent!
            // ..
            console.log("Send reset email successfully");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      }
      setModalVisible(!modalVisible);
      navigation.navigate("Home");
    }
  };
  useEffect(() => {
    if (user != "" && role != "") {
      //Debug
      // console.log(user, role);
      navigation.navigate("Home");
    } else {
      console.log("Pass");
    }
  }, [userInfo, user]);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Reset Password</Text>
            <TextInput
              placeholder="Email 📧 :"
              style={styles.input}
              value={username}
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
            <TextInput
              placeholder="Answer ❤️ :"
              style={styles.input}
              value={answer}
              onChangeText={(text) => {
                setAnswer(text);
              }}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={resetPassword}
            >
              <Text style={styles.textStyle}>Reset Password</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
        <TouchableOpacity onPress={handleLogin} style={styles.button1}>
          <Text style={{ fontWeight: "700", textAlign: "center" }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp} style={{ marginTop: 10 }}>
          <Text style={{ color: "#319DA0" }}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ marginTop: 10 }}
        >
          <Text style={{ color: "#319DA0" }}>Forgot Password ?</Text>
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
  button1: {
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
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  appText: {
    fontSize: 45,
    fontWeight: "800",
    color: "#0E5E6F",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    height: "40%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 25,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default Login;
