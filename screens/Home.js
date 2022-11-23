import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  LogBox,
  Modal,
  Pressable,
} from "react-native";
import { Dummy } from "../data/test";
// import { useSelector } from "react-redux";

const Home = ({ props, navigation }) => {
  const [users, setUsers] = useState([]);
  const [bbox, setBbox] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  let box = Dummy();
  const unratingTask = box.filter(
    (t) => t.status == "Success" && t.ratingCheck == true
  );
  console.log(box);

  console.log(unratingTask);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    if (unratingTask.length > 0) {
      setModalVisible(true);
      console.log("Found unrating task");
    } else {
      console.log("Not found");
    }
  }, [box]);
  return (
    <View style={styles.container}>
      <View style={styles.topSec}>
        <Image
          style={{ width: 50, height: 50, marginLeft: "5%" }}
          source={require("../assets/image-16.png")}
        />
        <Text style={{ fontSize: 26, fontWeight: "bold", marginLeft: "3%" }}>
          Home
        </Text>
      </View>
      <TouchableOpacity
        style={styles.test}
        onPress={() => navigation.navigate("FixForm")}
      >
        <Image
          style={{ width: 75, height: 75, marginLeft: "5%" }}
          source={require("../assets/image-1.png")}
        />
        <Text style={styles.homeHeader}>เเจ้งปัญหา</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.test}
        onPress={() => navigation.navigate("History")}
      >
        <Image
          style={{ width: 75, height: 75, marginLeft: "5%" }}
          source={require("../assets/image-2.png")}
        />
        <Text style={styles.homeHeader}>ประวัติการเเจ้งปัญหา</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.test}
        onPress={() => navigation.navigate("Stat")}
      >
        <Image
          style={{ width: 75, height: 75, marginLeft: "5%" }}
          source={require("../assets/image-3.png")}
        />
        <Text style={styles.homeHeader}>สถิติ</Text>
      </TouchableOpacity>

      {/* modal */}
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modal}>
          <View style={styles.modal_inner}>
            <View style={{ marginTop: "10%", alignItems: "center" }}>
              <Image
                style={{
                  height: 50,
                  width: 50,
                  marginLeft: "5%",
                  marginRight: "3%",
                }}
                source={require("../assets/image-6.png")}
              />
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                คําร้องของคุณได้รับการเเก้ไข
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                กรุณาไปทําการประเมิณที่หน้า History
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                Rub job Application
              </Text>
            </View>
            <View>
              <View style={styles.container_summit_modal}>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#44CB2E",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: "80%",
                    borderBottomRightRadius: 30,
                    borderBottomLeftRadius: 30,
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    // navigation.navigate("History");
                  }}
                >
                  <Text
                    style={{ fontSize: 26, fontWeight: "300", color: "#FFF" }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    marginTop: "12%",
    backgroundColor: "#FAF9F6",
  },
  topSec: {
    width: "100%",
    height: 75,
    backgroundColor: "#8EE2FD",
    flexDirection: "row",
    alignItems: "center",
  },
  test: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "17.5%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },

  homeHeader: {
    fontSize: 24,
    marginLeft: 30,
    fontWeight: "500",
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
  modal: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: "100%",
  },
  modal_inner: {
    width: "80%",
    height: 300,
    marginLeft: "10%",
    marginTop: "35%",
    backgroundColor: "#FFFF",
    borderRadius: 30,
    justifyContent: "space-between",
  },
  container_summit_modal: {
    width: "100%",
    height: 65,
    flexDirection: "row",
  },

  modal_alert: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: "100%",
  },
  modal_inner_alert: {
    width: "80%",
    height: 200,
    marginLeft: "10%",
    marginTop: "45%",
    backgroundColor: "#FFFF",
    borderRadius: 30,
    justifyContent: "space-between",
  },
});

export default Home;
