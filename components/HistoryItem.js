import React, { useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
const HistoryItem = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.onSelectTask}>
        <View>
          <View style={styles.detail}>
            {props.status != "Success" ? (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  style={{
                    width: 87,
                    height: 87,
                    borderRadius: 5,
                  }}
                  source={{ uri: props.url }}
                />
              </View>
            ) : (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  style={{
                    width: 87,
                    height: 87,
                    borderRadius: 5,
                  }}
                  source={{ uri: props.url_fix }}
                />
              </View>
            )}
            <View style={styles.inner_detail}>
              <Text style={{ fontWeight: "500", fontSize: 18 }}>
                {props.description}
              </Text>
              <Text style={{ fontWeight: "500", fontSize: 18 }}>
                {props.place}
              </Text>
            </View>
            <View style={styles.inner_right}>
              <Text style={{ fontWeight: "500", fontSize: 12 }}>
                {props.time}
              </Text>
              <Text style={{ fontWeight: "500", fontSize: 12 }}>
                {props.reject}
              </Text>
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
    width: "30%",
    justifyContent: "space-around",
  },
  inner_right: {
    justifyContent: "space-around",
    width: "25%",
  },
});

export default HistoryItem;
