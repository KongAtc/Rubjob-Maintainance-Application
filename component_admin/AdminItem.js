import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { app } from "../screens/FirebaseDB";
import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import firebase from "firebase/compat";
const lineNotify = require("line-notify-nodejs")(
  "DDNQRjE7gDNxOEM2cNJ3qnoJwgUbIWEwDAJqFfL57aF"
);
const AdminItem = (props) => {
  const [id, setId] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejDes, setRejDes] = useState("");
  const dbRef = app.firestore().collection("Fix_list");
  const { user, role } = useSelector((state) => state.userInfo);
  const timestamp = firebase.firestore.Timestamp.now();
  const t = timestamp.toDate().toDateString();
  let ref_id = "";

  const ChangeStatusPending = () => {
    ref_id = props.id;
    const dref = doc(dbRef, ref_id);
    updateDoc(dref, {
      status: "Pending",
      approve_user: user,
      time_approve: t,
    });
    lineNotify
      .notify({
        message:
          "\n🔥🔥🔥🔥🔥🔥🔥\n\nสถานที่ : " +
          props.place +
          "\n\nคําอธิบาย: " +
          props.description +
          "\n\nช่องทางการติดต่อ : " +
          props.phone +
          "\n\n💦💦💦💦💦💦💦",
      })
      .then(() => {
        console.log("send completed!");
      });
  };

  const setShow = () => {
    ChangeStatusPending();
  };
  const ChangeReject = () => {
    if (rejDes == "") {
      alert("กรุณากรอกเหตุผลการปฏิเสธ");
    } else {
      ref_id = props.id;
      const dref = doc(dbRef, ref_id);
      updateDoc(dref, {
        status: "Reject",
        rejectDesc: rejDes,
        rej_user: user,
        time_rej: t,
      });
    }
  };

  useEffect(() => {
    setId(props.id);
    if (props.status == "Pending") {
      setIsPending(true);
      setIsReject(true);
    }
    if (props.status == "Reject") {
      setIsReject(true);
      setIsPending(true);
    }
    if (props.status == "Success") {
      setIsReject(true);
      setIsPending(true);
    }
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        {/* Pending */}
        <Modal transparent={true} visible={showModal}>
          <View style={styles.modal}>
            <View style={styles.modal_inner}>
              <View style={styles.modal_text}>
                <Text>คุณเเน่ใจเเล้วหรือไม่ที่จะอนุมัติงานนี้?</Text>
              </View>
              <View style={styles.modal_box_btn}>
                <TouchableOpacity
                  style={styles.btn_cancel}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.text_btn}>Cancle</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn_confirm}
                  onPress={ChangeStatusPending}
                >
                  <Text style={styles.text_btn}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* Reject */}
        <Modal transparent={true} visible={showRejectModal}>
          <View style={styles.modal}>
            <View style={styles.modal_inner}>
              <View style={styles.modal_text}>
                <Text
                  style={{ margin: "auto", fontSize: 20, fontWeight: "500" }}
                >
                  สาเหตุการปฏิเสธ *
                </Text>

                <TextInput
                  style={styles.text_input}
                  onChangeText={(rejectDes) => {
                    setRejDes(rejectDes);
                  }}
                  multiline
                  numberOfLines={3}
                  placeholder="อาหารเเมวหมด"
                ></TextInput>
              </View>
              <View style={styles.modal_box_btn}>
                <TouchableOpacity
                  style={styles.btn_cancel}
                  onPress={() => setShowRejectModal(false)}
                >
                  <Text style={styles.text_btn}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn_confirm}
                  onPress={ChangeReject}
                >
                  <Text style={styles.text_btn}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={props.onSelectTask}>
          <View style={styles.detail}>
            <View>
              {props.status != "Success" ? (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
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
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
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
            </View>
            <View style={styles.inner_detail}>
              <Text style={{ fontWeight: "500", fontSize: 14 }}>
                {props.description}
              </Text>
              <Text style={{ fontWeight: "500", fontSize: 14 }}>
                {props.place}
              </Text>
            </View>
            <View style={styles.inner_right}>
              <Text style={styles.text_rej}>{props.time}</Text>
              {!isReject ? (
                <View style={styles.button_c}>
                  <TouchableHighlight
                    onPress={() => setShowModal(true)}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Image
                        style={styles.button_hide}
                        source={require("../assets/image-7.png")}
                      />
                    ) : (
                      <Image
                        style={styles.button}
                        source={require("../assets/image-7.png")}
                      />
                    )}
                  </TouchableHighlight>
                  {/* Cancel */}
                  <TouchableOpacity
                    onPress={() => setShowRejectModal(true)}
                    disabled={isReject}
                  >
                    {isReject ? (
                      <Image
                        style={styles.button_hide}
                        source={require("../assets/image-9.png")}
                      />
                    ) : (
                      <Image
                        style={styles.button}
                        source={require("../assets/image-9.png")}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.text_rej}>{props.reject}</Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = new StyleSheet.create({
  detail: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    height: 131,
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
    width: "30%",
    justifyContent: "space-around",
  },
  button_c: {
    flexDirection: "row",
  },
  button: {
    width: 30,
    height: 30,
    margin: 10,
  },
  button_hide: {
    width: 30,
    height: 30,
    margin: 10,
    opacity: 0,
  },
  modal: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal_inner: {
    width: 300,
    height: 200,
  },
  modal_text: {
    backgroundColor: "#ffffff",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modal_box_btn: {
    flexDirection: "row",
  },
  text_btn: {
    color: "white",
    fontSize: 15,
  },
  btn_cancel: {
    width: 150,
    height: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 10,
  },
  btn_confirm: {
    width: 150,
    height: 50,
    backgroundColor: "#44CB2E",
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 10,
  },
  text_input: {
    width: "80%",
    marginTop: 15,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    padding: 10,
  },
  text_rej: {
    fontSize: 14,
  },
});
export default AdminItem;
