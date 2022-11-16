import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import Historyitem from "./HistoryItem";
import { FlatList } from "react-native-gesture-handler";
const HistoryTile = (props) => {
  const renderHistoryItem = (itemData) => {
    return (
      <Historyitem
        id={itemData.item.id}
        status={itemData.item.status}
        description={itemData.item.description}
        place={itemData.item.place}
        phone={itemData.item.phone}
        time={itemData.item.time}
        url={itemData.item.url}
        reject={itemData.item.rejectDesc}
        url_fix={itemData.item.url_image_fix}
        des_fix={itemData.item.description_fix}
        onSelectTask={() => {
          props.navigation.navigate("Detail", {
            taskId: itemData.item.id,
            status: itemData.item.status,
            description: itemData.item.description,
            place: itemData.item.place,
            phone: itemData.item.phone,
            time: itemData.item.time,
            url: itemData.item.url,
            reject: itemData.item.rejectDesc,
            url_fix: itemData.item.url_image_fix,
            des_fix: itemData.item.description_fix,
            from: "AH",
          });
        }}
      />
    );
  };

  return (
    <View>
      <FlatList
        style={{ width: "100%" }}
        data={props.listData}
        renderItem={renderHistoryItem}
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
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  inner_detail: {
    justifyContent: "space-around",
  },
});

export default HistoryTile;
