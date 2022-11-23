import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import Historyitem from "./HistoryItem";
import { FlatList } from "react-native";
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
        ratingCheck={itemData.item.ratingCheck}
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
            ratingCheck: itemData.item.ratingCheck,
            from: "H",
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
        renderItem={renderHistoryItem}
      />
    </View>
    // <View>
    //     <View data={props.listData}>
    //       {/* <Text
    //         style={{
    //           color: "#FF922E",
    //           fontSize: 18,
    //           marginBottom: "1%",
    //           marginLeft: "2%",
    //         }}
    //       >
    //         {props.status}
    //       </Text> */}
    //       <View
    //         style={{
    //           borderBottomColor: "grey",
    //           borderBottomWidth: StyleSheet.hairlineWidth,
    //           marginBottom: "2%",
    //         }}
    //       />
    //       <View style={styles.detail}>
    //         <Image
    //           style={{ width: 87, height: 87, marginLeft: "3%" }}
    //           source={require("../assets/cat.jpg")}
    //         />
    //         <View style={styles.inner_detail}>
    //           <Text style={{ fontWeight: "500", fontSize: 18 }}>
    //             {props.description}
    //           </Text>
    //           <Text style={{ fontWeight: "500", fontSize: 18 }}>{props.place}</Text>
    //         </View>
    //         <Text style={{ fontWeight: "500", fontSize: 12 }}>{props.phone}</Text>
    //       </View>
    //     </View>
    //   {/* </ScrollView> */}
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAF9F6",
    height: "100%",
    width: "100%",
    //   alignItems: "center",
    //   justifyContent: "space-around",
  },
  nav: {
    // flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 75,
    backgroundColor: "#8EE2FD",
    alignItems: "center",
    // flexWrap: "nowrap"
  },
  request_head: {
    width: 98,
    height: 22,
    left: 22,
    top: 82,

    // color: "#FF922E",
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
    // flexDirection: "column"
    justifyContent: "space-around",
  },
});

export default HistoryTile;
