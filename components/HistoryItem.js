import React, { useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  Pressable,
} from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import { app } from "../screens/FirebaseDB";
import { doc, updateDoc } from "firebase/firestore";
import firebase from "firebase/compat";
const HistoryItem = (props) => {
  const dbRef = app.firestore().collection("Fix_list");
  const [modalVisible, setModalVisible] = useState(false);
  const [ratingCount, setRatingCount] = useState(0);
  let ref_id = "";
  return (
    <View>
      <TouchableOpacity onPress={props.onSelectTask}>
        <View>
          <View style={styles.detail}>
            {props.status != "Success" ? (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  style={{
                    width: 87,
                    height: 87,
                    borderRadius: 5,
                  }}
                  source={{ uri: props.url }}
                />
              </View>
            ) : (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  style={{
                    width: 87,
                    height: 87,
                    borderRadius: 5,
                  }}
                  source={{ uri: props.url_fix }}
                />
              </View>
            )}
            <View style={styles.inner_detail}>
              <Text style={{ fontWeight: "500", fontSize: 18 }}>
                {props.description}
              </Text>
              <Text style={{ fontWeight: "500", fontSize: 18 }}>
                {props.place}
              </Text>
            </View>
            <View style={styles.inner_right}>
              <Text style={{ fontWeight: "500", fontSize: 12 }}>
                {props.time}
              </Text>

              {/* {props.ratingCheck ? (
                <TouchableOpacity>
                  <Text>True</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  <Text>False</Text>
                </TouchableOpacity>
              )} */}
              {props.ratingCheck && (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <Text style={{ fontSize: 22 }}>⭐</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
            <AirbnbRating
              count={5}
              reviews={["Terrible", "Bad", "Meh", "OK", "Good"]}
              defaultRating={5}
              size={20}
              onFinishRating={(rating) => {
                setRatingCount(rating);
                console.log(rating);
                ref_id = props.id;
                const dref = doc(dbRef, ref_id);
                updateDoc(dref, {
                  ratingCheck: false,
                  score: rating,
                }).then(() => {
                  setModalVisible(false);
                  console.log("update complete");
                });
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F2EC",
    height: "100%",
    width: "100%",
  },
  nav: {
    flexDirection: "row",
    width: "100%",
    height: 75,
    backgroundColor: "#8EE2FD",
    alignItems: "center",
  },
  request_head: {
    width: 98,
    height: 22,
    left: 22,
    top: 82,
  },
  detail: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "2%",
    height: 110,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  inner_detail: {
    width: "30%",
    justifyContent: "space-around",
  },
  inner_right: {
    justifyContent: "space-around",
    width: "25%",
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
});

export default HistoryItem;
