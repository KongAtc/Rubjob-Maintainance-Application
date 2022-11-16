import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

import { Dummy_all } from "../data/All_data";
import StaffList from "../component_staff/staffList";

const Staff = ({ props, navigation }) => {

  const [users, setUsers] = useState([]);
  const box = Dummy_all();
  const pendingItem = box.filter((t) => t.status == "Pending");

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Image
          style={{ width: 50, height: 50, marginLeft: "5%" }}
          source={require("../assets/image-15.png")}
        />
        <Text style={{ fontSize: 26, fontWeight: "bold", marginLeft: "3%" }}>
          Staff
        </Text>
      </View>
      <ScrollView>
        <View>
          {pendingItem.length > 0 && (
            <View>
              <Text
                style={{
                  color: "black",
                  fontSize: 18,
                  margin: 10,
                  marginLeft: "4%",
                  fontWeight: "500",
                }}
              >
                {"Pending (" + pendingItem.length + ")"}
              </Text>
              <View
                style={{
                  borderBottomColor: "grey",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
            </View>
          )}
          <StaffList listData={pendingItem} navigation={navigation}></StaffList>
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
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 2,
  },
  inner_detail: {
    justifyContent: "space-around",
  },
  inner_right: {
    justifyContent: "space-around",
  },
});

export default Staff;
