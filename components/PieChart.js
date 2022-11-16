import React from "react";
import { Dimensions } from "react-native";
import { View } from "react-native";
import { PieChart, } from "react-native-chart-kit";
export default function Pie_C(props) {
  let box = props.listData;
  const requestItem = box.filter((t) => t.status == "Request").length;
  const pendingItem = box.filter((t) => t.status == "Pending").length;
  const successItem = box.filter((t) => t.status == "Success").length;
  const rejectItem = box.filter((t) => t.status == "Reject").length;
  console.log(requestItem, pendingItem, successItem, rejectItem);

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  let data = [
    {
      name: "Request",
      count: requestItem,
      color: "#F49D1A",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Pending",
      count: pendingItem,
      color: "#0D4C92",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Success",
      count: successItem,

      color: "#54B435",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Reject",
      count: rejectItem,
      color: "#CF0A0A",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <PieChart
      data={data}
      width={Dimensions.get("window").width - 16}
      height={220}
      chartConfig={chartConfig}
      accessor={"count"}
      backgroundColor={"transparent"}
      paddingLeft={"15"}
      center={[10, 10]}
      absolute
    />
  );
}
