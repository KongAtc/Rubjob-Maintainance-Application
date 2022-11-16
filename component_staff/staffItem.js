import React, { useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
const StaffItem = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.onSelectTask}>
        <View>
          <View style={styles.detail}>
            <Image
              style={{ width: 87, height: 87, marginLeft: "3%" }}
              source={{ uri: props.url }}
            />
            <View style={styles.inner_detail}>
              <Text style={{ fontWeight: "500", fontSize: 14 }}>
                {props.description}
              </Text>
              <Text style={{ fontWeight: "500", fontSize: 14 }}>
                {props.place}
              </Text>
            </View>
            <View style={styles.inner_right}>
              <Text style={{ fontWeight: "500", fontSize: 14 }}>
                {props.time}
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={props.goToStaffForm}
              >
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../assets/image-13.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F2EC",
    height: "100%",
    width: "100%",
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
    width: "30%",
    justifyContent: "space-around",
  },
  inner_right: {
    width: "30%",
    justifyContent: "space-around",
  },
});

export default StaffItem;
