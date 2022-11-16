import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const Home = ({ props, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSec}>
        <Image
          style={{ width: 50, height: 50, marginLeft: "5%" }}
          source={require("../assets/image-16.png")}
        />
        <Text style={{ fontSize: 26, fontWeight: "bold", marginLeft: "3%" }}>
          Home
        </Text>
      </View>
      <TouchableOpacity
        style={styles.test}
        onPress={() => navigation.navigate("FixForm")}
      >
        <Image
          style={{ width: 75, height: 75, marginLeft: "5%" }}
          source={require("../assets/image-1.png")}
        />
        <Text style={styles.homeHeader}>เเจ้งปัญหา</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.test}
        onPress={() => navigation.navigate("History")}
      >
        <Image
          style={{ width: 75, height: 75, marginLeft: "5%" }}
          source={require("../assets/image-2.png")}
        />
        <Text style={styles.homeHeader}>ประวัติการเเจ้งปัญหา</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.test}
        onPress={() => navigation.navigate("Stat")}
      >
        <Image
          style={{ width: 75, height: 75, marginLeft: "5%" }}
          source={require("../assets/image-3.png")}
        />
        <Text style={styles.homeHeader}>สถิติ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    marginTop: "12%",
    backgroundColor: "#FAF9F6",
  },
  topSec: {
    width: "100%",
    height: 75,
    backgroundColor: "#8EE2FD",
    flexDirection: "row",
    alignItems: "center",
  },
  test: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "17.5%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },

  homeHeader: {
    fontSize: 24,
    marginLeft: 30,
    fontWeight: "500",
  },
});

export default Home;
