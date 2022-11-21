import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { app } from "./FirebaseDB";
import AdminList from "../component_admin/AdminList";
import { Dummy_all } from "../data/All_data";
const Admin = ({ props, navigation }) => {
  const [users, setUsers] = useState([]);

  const box = Dummy_all();
  //Filter Data
  const requestItem = box.filter((t) => t.status == "Request");
  const pendingItem = box.filter((t) => t.status == "Pending");

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Image
          style={{ width: 50, height: 50, marginLeft: "5%" }}
          source={require("../assets/image-15.png")}
        />
        <Text style={{ fontSize: 26, fontWeight: "bold", marginLeft: "3%" }}>
          Admin
        </Text>
      </View>
      <ScrollView>
        {/* <!--Request--> */}
        <View>
          {requestItem.length > 0 && (
            <View>
              <Text
                style={[
                  styles.header_txt,
                  { color: "#FF922E", marginLeft: "3%", fontWeight: "600" },
                ]}
              >
                {"Request (" + requestItem.length + ")"}
              </Text>
              <View
                style={{
                  borderBottomColor: "grey",
                }}
              />
            </View>
          )}
          <AdminList listData={requestItem} navigation={navigation} />
        </View>
        {/* <!--Pending--> */}
        <View>
          {pendingItem.length > 0 && (
            <View>
              <Text
                style={[
                  styles.header_txt,
                  { color: "#1C5F9D", marginLeft: "3%", fontWeight: "600" },
                ]}
              >
                {"Pending (" + pendingItem.length + ")"}
              </Text>
              <View
                style={{
                  borderBottomColor: "grey",
                }}
              />
            </View>
          )}
          <AdminList listData={pendingItem} navigation={navigation} />
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
    backgroundColor: "#FFFFFF",
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
    justifyContent: "space-around",
  },
  inner_right: {
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
  header_txt: {
    fontSize: 18,
    margin: 10,
    marginLeft: "2%",
  },
});

export default Admin;
