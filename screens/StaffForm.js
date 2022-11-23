import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";

import { app } from "./FirebaseDB";
import firebase from "firebase/compat/app";
// import emailjs from "emailjs/browser";
// app;
// เอา ID มาใส่
export default function StaffForm({ route, navigation }) {
  const [description_fix, setDescription_fix] = useState("");
  const taskId = route.params.taskId.toString();
  let url_image;
  const { user, role } = useSelector((state) => state.userInfo);
  //DB import
  const dbRef = app.firestore().collection("Fix_list");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  //modal
  const [modalShow, setModalShow] = useState(false);
  const [modalalert, setModalAlert] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    const source = { uri: result.uri };
    setImage(source);
    //Debug
    // console.log(source);
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    var ref = firebase.storage().ref().child(filename).put(blob);
    let getImageURL;
    try {
      await ref;
    } catch (e) {
      console.log(e);
    }
    try {
      getImageURL = await firebase
        .storage()
        .ref()
        .child(filename)
        .getDownloadURL();
    } catch (e) {
      console.log(e);
    }
    url_image = getImageURL;
    setUploading(false);
    setImage(null);
  };

  const summitForm = async () => {
    await uploadImage();
    const timestamp = firebase.firestore.Timestamp.now();
    const t = timestamp.toDate().toDateString();
    setSpinner(true);
    //Use For Fix Form
    dbRef
      .doc(taskId)
      .update({
        description_fix: description_fix,
        status: "Success",
        url_image_fix: url_image,
        time_fix: t,
        staff_user: user,
        ratingCheck: true,
      })
      .then(setSpinner(false))
      .catch((err) => {
        console.log(err);
      });
    offModal();
    setSpinner(false);
    navigation.navigate("Home");
  };

  //On off modal
  function onModal() {
    setModalShow(true);
  }
  function offModal() {
    setModalShow(false);
  }

  function onModalAlert() {
    setModalAlert(true);
  }
  function offModalAlert() {
    setModalAlert(false);
  }

  //Checking Field
  function checkField() {
    if (description_fix == "" || image == null) {
      onModalAlert();
    } else {
      onModal();
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View>
          <View style={styles.headbar}>
            <Image
              style={{
                height: 50,
                width: 50,
                marginLeft: "5%",
                marginRight: "3%",
              }}
              source={require("../assets/image-6.png")}
            />
            <Text style={styles.headtext}>Staff Form</Text>
          </View>

          <View style={styles.group_input}>
            <Text style={styles.text_headerlabel}>คำอธิบายการเเก้ปัญหา *</Text>
            <TextInput
              multiline
              numberOfLines={2}
              style={styles.text_input}
              placeholder="รายระเอียดในการเเก้ไข"
              defaultValue={description_fix}
              onChangeText={(newDescription_fix) =>
                setDescription_fix(newDescription_fix)
              }
            />
          </View>

          <View style={styles.group_input}>
            <Text style={styles.text_headerlabel}>รูปภาพ *</Text>
            <TouchableOpacity
              style={{
                width: "90%",
                backgroundColor: "#D9D9D9",
                borderRadius: 10,
                marginLeft: "5%",
                height: "auto",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={pickImage}
            >
              {image == null ? (
                <Text style={{ fontSize: 24, fontWeight: "300", margin: 30 }}>
                  {" "}
                  Upload Here
                </Text>
              ) : null}
              {image && (
                <Image
                  source={{ uri: image.uri }}
                  style={{
                    width: 300,
                    height: 300,
                    marginBottom: 20,
                    borderRadius: 10,
                    marginTop: 20,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container_summit}>
          <TouchableOpacity
            style={{
              width: "50%",
              height: "100%",
              backgroundColor: "#8EE2FD33",
              justifyContent: "center",
              alignItems: "center",
              opacity: "80%",
            }}
            onPress={() => navigation.navigate("Staff")}
          >
            <Text style={{ fontSize: 26, fontWeight: "650" }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "50%",
              height: "100%",
              backgroundColor: "#A9FAAC",
              justifyContent: "center",
              alignItems: "center",
              opacity: "80%",
            }}
            onPress={checkField}
          >
            <Text style={{ fontSize: 26, fontWeight: "650" }}>Save</Text>
          </TouchableOpacity>
        </View>

        <Modal transparent={true} visible={modalShow}>
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
                  ยืนยันการส่งฟอร์ม
                </Text>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  สำหรับการส่งซ่อม
                </Text>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  (Comfirm Staff Form)
                </Text>
                <ActivityIndicator
                  animating={spinner}
                  style={{ marginTop: 5 }}
                ></ActivityIndicator>
              </View>
              <View>
                <View style={styles.container_summit_modal}>
                  <TouchableOpacity
                    style={{
                      width: "50%",
                      height: "100%",
                      backgroundColor: "#E23333",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: "80%",
                      borderBottomLeftRadius: 30,
                    }}
                    onPress={offModal}
                  >
                    <Text
                      style={{ fontSize: 26, fontWeight: "300", color: "#FFF" }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: "50%",
                      height: "100%",
                      backgroundColor: "#44CB2E",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: "80%",
                      borderBottomRightRadius: 30,
                    }}
                    onPress={summitForm}
                  >
                    <Text
                      style={{ fontSize: 26, fontWeight: "300", color: "#FFF" }}
                    >
                      Summit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* Alert Modal */}
        <Modal transparent={true} visible={modalalert}>
          <View style={styles.modal_alert}>
            <View style={styles.modal_inner_alert}>
              <View style={{ marginTop: "20%", alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  กรุณากรอกข้อมูลให้ครบถ้วน
                </Text>
              </View>
              <View>
                <View style={styles.container_summit_modal}>
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#E23333",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: "80%",
                      borderBottomLeftRadius: 30,
                      borderBottomRightRadius: 30,
                    }}
                    onPress={offModalAlert}
                  >
                    <Text
                      style={{ fontSize: 26, fontWeight: "300", color: "#FFF" }}
                    >
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    marginTop: "12%",
  },
  headbar: {
    backgroundColor: "#8EE2FD",
    width: "100%",
    height: 75,
    flexDirection: "row",
    alignItems: "center",
  },
  headtext: {
    fontSize: 24,
    fontWeight: "bold",
  },
  group_input: {
    backgroundColor: "#F5F5F5",
    width: "100%",
    flexDirection: "column",
    marginTop: "2%",
  },
  text_headerlabel: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: "5%",
    marginBottom: "2%",
  },
  text_input: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    width: "90%",
    height: 69,
    fontSize: 20,
    marginLeft: "5%",
    padding: 10,
  },
  container_summit: {
    width: "100%",
    height: 65,
    flexDirection: "row",
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
