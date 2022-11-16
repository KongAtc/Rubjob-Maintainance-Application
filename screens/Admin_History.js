import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

import HistoryTile from "../components/HistoryTile";
import AdminHis from "../components/AdminHis";
import { app } from "./FirebaseDB";
import { Dummy_all } from "../data/All_data";
const Admin_his = ({ route, navigation }) => {
  const [users, setUsers] = useState([]);
  const [bbox, setBbox] = useState([]);

  let box = Dummy_all();

  const requestItem = box.filter((t) => t.status == "Request");
  const pendingItem = box.filter((t) => t.status == "Pending");
  const successItem = box.filter((t) => t.status == "Success");
  const rejectItem = box.filter((t) => t.status == "Reject");

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Image
          style={{ width: 50, height: 50, marginLeft: "5%" }}
          source={require("../assets/his-nav.png")}
        />
        <Text style={{ fontSize: 26, fontWeight: "bold", marginLeft: "3%" }}>
          Overview
        </Text>
      </View>
      <ScrollView>
        <View>
          {requestItem.length > 0 && (
            <View>
              <Text
                style={[
                  styles.header_txt,
                  { color: "#FF922E", marginLeft: "3%", fontWeight: "600" },
                ]}
              >
                {"Request" + "(" + requestItem.length + ")"}
              </Text>
              <View
                style={{
                  borderBottomColor: "grey",
                }}
              />
            </View>
          )}
          <AdminHis listData={requestItem} navigation={navigation} />
        </View>
        <View>
          {pendingItem.length > 0 && (
            <View>
              <Text
                style={[
                  styles.header_txt,
                  { color: "#1C5F9D", marginLeft: "3%", fontWeight: "600" },
                ]}
              >
                {"Pending" + "(" + pendingItem.length + ")"}
              </Text>
              <View
                style={{
                  borderBottomColor: "grey",
                }}
              />
            </View>
          )}
          <AdminHis listData={pendingItem} navigation={navigation} />
        </View>
        <View>
          {successItem.length > 0 && (
            <View>
              <Text
                style={[
                  styles.header_txt,
                  { color: "#18B23A", marginLeft: "3%", fontWeight: "600" },
                ]}
              >
                {"Success" + "(" + successItem.length + ")"}
              </Text>
              <View
                style={{
                  borderBottomColor: "grey",
                }}
              />
            </View>
          )}
          <AdminHis listData={successItem} navigation={navigation} />
        </View>
        <View>
          {rejectItem.length > 0 && (
            <View>
              <Text
                style={[
                  styles.header_txt,
                  { color: "#E23333", marginLeft: "3%", fontWeight: "600" },
                ]}
              >
                {"Reject" + "(" + rejectItem.length + ")"}
              </Text>
              <View
                style={{
                  borderBottomColor: "grey",
                }}
              />
            </View>
          )}
          <AdminHis listData={rejectItem} navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAF9F6",
    height: "100%",
    width: "100%",
    marginTop: "12%",
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
    backgroundColor: "#D9D9D9",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "2%",
    height: 110,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 2,
  },
  inner_detail: {
    justifyContent: "space-around",
  },
  header_txt: {
    fontSize: 18,
    margin: 10,
    marginLeft: "2%",
    fontWeight: "500",
  },

});

export default Admin_his;
