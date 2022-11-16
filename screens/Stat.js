import React from "react";
import Pie_C from "../components/PieChart";
import Barchart1 from "../components/BarChart";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { TDummy } from "../data/Qtime";
const Stat = ({ route, navigation }) => {
  const statData = TDummy();
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topSec}>
          <TouchableOpacity
            style={{ marginLeft: "2%", marginRight: "1%" }}
            onPress={() => navigation.navigate("Home")}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../assets/caret-3.png")}
            ></Image>
          </TouchableOpacity>
          <Image
            style={{ width: 50, height: 50, marginLeft: "5%" }}
            source={require("../assets/image-20.png")}
          />
          <Text style={{ fontSize: 26, fontWeight: "bold", marginLeft: "3%" }}>
            Stat
          </Text>
        </View>
        <View
          style={{
            marginTop: "5%",
            alignItems: "center",
            width: "90%",
            alignItems: "center",

            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              margin: "5%",
            }}
          >
            กราฟเเสดงสถานะทั้งหมดของ Rub Job
          </Text>
          <Pie_C listData={statData} />
        </View>

        <View
          style={{
            marginTop: "5%",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500", margin: "5%" }}>
            กราฟเเสดงสถานะของเเต่ละเดือน
          </Text>
          <Barchart1 listData={statData} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default Stat;
