import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

import ImageView from "react-native-image-view";

const Detail = ({ route, navigation }) => {
  const description = route.params.description;
  const place = route.params.place;
  const phone = route.params.phone;
  const time = route.params.time;
  const url = route.params.url;
  const rejectd = route.params.reject;
  const url_fix = route.params.url_fix;
  const des_fix = route.params.des_fix;
  const from = route.params.from;

  const [users, setUsers] = useState([]);
  const [task, setTask] = useState("");
  const [page, setPage] = useState("");
  const [imgView, isImageViewVisible] = useState(false);
  const [imgFix, isImgFix] = useState(false);

  //DeBug
  // console.log(url.toString());

  useEffect(() => {
    if (from == "H") {
      setPage("History");
    }
    if (from == "A") {
      setPage("Admin");
    }
    if (from == "S") {
      setPage("Staff");
    }
    if (from == "AH") {
      setPage("Overview");
    }
    //Debug
    // console.log("box == ", rejectd);
  });
  const images = [
    {
      source: {
        uri: url,
      },
      title: "raw",
      resizeMode: "contain",
    },
  ];
  const images_fix = [
    {
      source: {
        uri: url_fix,
      },
      title: "fix",
      resizeMode: "contain",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.topSec}>
        <TouchableOpacity
          style={{ marginLeft: "2%", marginRight: "1%" }}
          onPress={() => navigation.navigate(page)}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/caret-3.png")}
          ></Image>
        </TouchableOpacity>
        <Image
          style={{ width: 50, height: 50, marginLeft: "5%" }}
          source={require("../assets/image-19.png")}
        />
        <Text style={{ fontSize: 26, fontWeight: "bold", marginLeft: "3%" }}>
          Detail
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        {/* Image Show */}
        <View style={styles.imageSec}>
          <Text style={{ fontSize: 18, marginBottom: 20 }}>
            รูปภาพก่อนแก้ไข
          </Text>
          <ImageView
            images={images}
            isVisible={imgView}
            onClose={() => isImageViewVisible(false)}
          />
          <TouchableOpacity onPress={() => isImageViewVisible(true)}>
            <Image
              style={{
                width: 180,
                height: 180,
                borderRadius: 15,
              }}
              source={{ uri: url }}
            />
          </TouchableOpacity>
        </View>
        {url_fix != null && (
          <View style={styles.imageSecFix}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>
              รูปภาพหลังแก้ไข
            </Text>
            <ImageView
              images={images_fix}
              isVisible={imgFix}
              swipeToCloseEnabled={true}
              onClose={() => isImgFix(false)}
            />
            <TouchableOpacity onPress={() => isImgFix(true)}>
              <Image
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: 15,
                }}
                source={{ uri: url_fix }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.detailSec}>
        <View style={styles.detailSecLeft}>
          <Text style={styles.header}>คำอธิบายปัญหา: </Text>
          <Text style={styles.header}>สถานที่: </Text>
          <Text style={styles.header}>วันที่: </Text>
          <Text style={styles.header}>ช่องทางการติดต่อ: </Text>
          {rejectd != null && (
            <Text style={styles.header}>สาเหตุการปฏิเสธ: </Text>
          )}
        </View>
        <View style={styles.detailSecRight}>
          <Text style={styles.subHeader}>{description}</Text>
          <Text style={styles.subHeader}>{place}</Text>
          <Text style={styles.subHeader}>{time}</Text>
          <Text style={styles.subHeader}>{phone}</Text>
          {rejectd != null && <Text style={styles.subHeader}>{rejectd}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    height: "100%",
    width: "100%",
    backgroundColor: "#FAF9F6",
    marginTop: "12%",
  },
  topSec: {
    width: "100%",
    height: 75,
    backgroundColor: "#8EE2FD",
    flexDirection: "row",
    alignItems: "center",
  },
  imageSec: {
    width: "50%",
    height: "20%",
    alignItems: "center",
  },
  imageSecFix: {
    width: "50%",
    height: "20%",
    alignItems: "center",
  },
  detailSec: {
    marginTop: 50,
    width: "100%",
    height: "30%",
    flexDirection: "row",
  },
  detailSecLeft: {
    height: "100%",
    width: "50%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  detailSecRight: {
    height: "100%",
    width: "50%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  header: {
    marginLeft: "10%",
    fontSize: 18,
    fontWeight: "700",
  },
  subHeader: {
    marginLeft: "12.5%",
    fontSize: 18,
    fontWeight: "500",
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

export default Detail;
