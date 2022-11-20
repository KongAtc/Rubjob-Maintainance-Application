import React, { useRef, useState } from "react";
import { View } from "react-native";
import AdminItem from "./AdminItem";
import { FlatList } from "react-native-gesture-handler";
const AdminList = (props) => {
  const renderAdminItem = (itemData) => {
    return (
      <AdminItem
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
            from: "A",
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
        renderItem={renderAdminItem}
      />
    </View>
  );
};
export default AdminList;
