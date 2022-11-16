import React from "react";
import {
  LineChart,
} from "react-native-chart-kit";

import firebase from "firebase/compat";
import { Dimensions } from "react-native";
export default function Barchart1(props) {


  let box = props.listData;
  console.log("box>>>>", box);

  const janCount = box.filter(
    (t) => t.status == "Success" || t.time.includes("Jan")
  ).length;
  const febCount = box.filter(
    (t) => t.status == "Success" || t.time.includes("Feb")
  ).length;
  const marCount = box.filter(
    (t) => t.status == "Success" || t.time.includes("Mar")
  ).length;
  const aprCount = box.filter(
    (t) => t.status == "Success" || t.time.includes("Apr")
  ).length;
  const mayCount = box.filter(
    (t) => t.status == "Success" || t.time.includes("May")
  ).length;
  const junCount = box.filter(
    (t) => t.status == "Success" || t.time.includes("Jun")
  ).length;
  const julCount = box.filter(
    (t) => t.status == "Success" || t.time.includes("Jul")
  ).length;
  const augCount = box.filter(
    (t) => t.status == "Success" || t.time.includes("Aug")
  ).length;
  const sepCount = box.filter(
    (t) => t.status == "Success" || t.time.includes("Sep")
  ).length;
  const octCount = box.filter(
    (t) => t.status == "Success" || t.time.includes("Oct")
  ).length;
  const novCount = box.filter(
    (t) => t.status == "Success" || t.time.includes("Nov")
  ).length;
  const decCount = box.filter(
    (t) => t.status == "Success" || t.time.includes("Dec")
  ).length;
  console.log(janCount);
  return (
    <LineChart
      data={{
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            data: [
              janCount,
              febCount,
              marCount,
              aprCount,
              mayCount,
              junCount,
              julCount,
              augCount,
              sepCount,
              novCount,
              decCount,
            ],
          },
        ],
      }}
      width={Dimensions.get("window").width} // from react-native
      height={220}
      yAxisLabel="🔥"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundGradientFrom: "#08130D",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(63, 143, 244, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
        style: {
          borderRadius: 16,
          backgroundColor: "red",
        },
        propsForDots: {
          r: "6",
          strokeWidth: "1",
          stroke: "#96E5D1",
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        backgroundColor: "white",
        width: "70%",
      }}
    />
  );
}
