import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";

import { app } from "./FirebaseDB";
import firebase from "firebase/compat";
// import { Dropdown } from "react-native-material-dropdown";
const lineNotify = require("line-notify-nodejs")(
  "dEo2sIrWIemijIwPBgS84gqtkt0h1bhQhVxpWndTfVw"
);
export default function FixForm({ props, navigation }) {
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const { user, role } = useSelector((state) => state.userInfo);
  const [modalShow, setModalShow] = useState(false);
  const [modalalert, setModalAlert] = useState(false);
  const [spinner, setSpinner] = useState(false);
  let url_image;

  let data = [
    {
      value: "banana",
    },
    {
      value: "apple",
    },
  ];
  //Connect FireBase
  const dbRef = app.firestore().collection("Fix_list");

  // Dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   { label: "Apple", value: "apple" },
  //   { label: "Banana", value: "banana" },
  // ]);
  //Upload Image
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  //Select Image
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
  //uploadImage
  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    var ref = app.storage().ref().child(filename).put(blob);
    let getImageURL;
    try {
      await ref;
    } catch (e) {
      console.log(e);
    }
    try {
      getImageURL = await app.storage().ref().child(filename).getDownloadURL();
    } catch (e) {
      console.log(e);
    }

    url_image = getImageURL;
    setUploading(false);
    setImage(null);
  };
  //summit
  const summitForm = async () => {
    await uploadImage();
    console.log(place, description, phone);
    const timestamp = firebase.firestore.Timestamp.now();
    const t = timestamp.toDate().toDateString();
    setSpinner(true);
    dbRef
      .add({
        place: place,
        description: description,
        phone: phone,
        time: t,
        status: "Request",
        url: url_image,
        req_user: user,
        ratingCheck: false,
        score: "",
      })
      .catch((err) => {
        console.log(err);
      });
    lineNotify
      .notify({
        message:
          "\n🔥🔥🔥🔥🔥🔥🔥\n\nสถานที่ : " +
          place +
          "\n\nคําอธิบาย: " +
          description +
          "\n\nช่องทางการติดต่อ : " +
          phone,
      })
      .then(() => {
        console.log("send completed!");
        setSpinner(false);
      });
    setPlace("");
    setDescription("");
    setPhone("");
    offModal();
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
    if (place == "" || description == "" || phone == "" || image == null) {
      onModalAlert();
    } else {
      onModal();
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
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
            <Text style={styles.headtext}>Fix Form</Text>
          </View>

          <View style={styles.group_input}>
            <Text style={styles.text_headerlabel}>สถานที่ *</Text>
            <TextInput
              multiline
              numberOfLines={2}
              style={styles.text_input}
              placeholder="สถานที่เเจ้งซ่อม"
              defaultValue={place}
              onChangeText={(newPlace) => {
                setPlace(newPlace);
              }}
            />
          </View>

          <View style={styles.group_input}>
            <Text style={styles.text_headerlabel}>คำอธิบายปัญหา *</Text>
            <TextInput
              multiline
              numberOfLines={2}
              style={styles.text_input}
              placeholder="รายระเอียดของปัญหาที่เกิดขึ้น"
              defaultValue={description}
              onChangeText={(newDescription) => {
                setDescription(newDescription);
              }}
            />
          </View>

          <View style={styles.group_input}>
            <Text style={styles.text_headerlabel}>ช่องทางการติดต่อ *</Text>
            <TextInput
              multiline
              numberOfLines={2}
              style={styles.text_input}
              placeholder="สำหรับทำการติดต่อ"
              keyboardType="numeric"
              maxLength={10}
              defaultValue={phone}
              onChangeText={(newPhone) => {
                setPhone(newPhone);
              }}
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
                  📸
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
          <View style={styles.group_input}>
            <Text style={styles.text_headerlabel}>ประเภทปัญหา *</Text>
            {/* <Dropdown label="Favourite fruit" data={data} /> */}
          </View>
        </View>
      </ScrollView>

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
          onPress={() => navigation.navigate("Home")}
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

      {/* confirm Modal */}
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
              <ActivityIndicator
                animating={spinner}
                style={{ marginTop: 5 }}
              ></ActivityIndicator>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                ยืนยันการส่งฟอร์ม
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                สำหรับการเเจ้งซ่อม
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                (Comfirm Request Form)
              </Text>
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
