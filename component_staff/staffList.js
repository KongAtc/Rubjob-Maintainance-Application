import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import StaffItem from "./staffItem";
import { FlatList } from "react-native";
const StaffList = (props) => {
  const renderStaffItem = (itemData) => {
    return (
      <StaffItem
        status={itemData.item.status}
        description={itemData.item.description}
        place={itemData.item.place}
        phone={itemData.item.phone}
        time={itemData.item.time}
        url={itemData.item.url}
        // ratingCheck={itemData.item.ratingCheck}
        onSelectTask={() => {
          props.navigation.navigate("Detail", {
            taskId: itemData.item.id,
            status: itemData.item.status,
            description: itemData.item.description,
            place: itemData.item.place,
            phone: itemData.item.phone,
            time: itemData.item.time,
            url: itemData.item.url,
            // ratingCheck: itemData.item.ratingCheck,
            from: "S",
          });
        }}
        goToStaffForm={() => {
          props.navigation.navigate("StaffForm", {
            taskId: itemData.item.id,
          });
        }}
      />
    );
  };

  return (
    <View>
      <FlatList
        //เขียนโค้ดเพิ่ม
        style={{ width: "100%" }}
        data={props.listData}
        renderItem={renderStaffItem}
      />
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
});

export default StaffList;
