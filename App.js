import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Home from "./screens/Home";
import Detail from "./screens/Detail";
import Stat from "./screens/Stat";
import FixForm from "./screens/FixForm";
import History from "./screens/History";
import Staff from "./screens/Staff";
import Admin from "./screens/Admin";
import Dummy from "./data/test";
import Register from "./screens/Register";
import Admin_History from "./screens/Admin_History";
import StaffForm from "./screens/StaffForm";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useSelector } from "react-redux";
import Login from "./screens/Login";

const Tab = createBottomTabNavigator();

const HomeNonStack = () => {
  const { user, role } = useSelector((state) => state.userInfo);
  return (
    <Provider store={store}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        {role != "" && (
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => {
                return <Ionicons name="ios-home" size={size} color={color} />;
              },
            }}
          />
        )}
        {role != "" && (
          <Tab.Screen
            name="History"
            component={History}
            options={{
              tabBarIcon: ({ color, size }) => {
                return <Ionicons name="ios-earth" size={size} color={color} />;
              },
            }}
          />
        )}

        {role == "staff" && (
          <Tab.Screen
            name="Staff"
            component={Staff}
            options={{
              tabBarIcon: ({ color, size }) => {
                return <Ionicons name="ios-earth" size={size} color={color} />;
              },
            }}
          />
        )}

        {role == "Admin" && (
          <Tab.Screen
            name="Admin"
            component={Admin}
            options={{
              tabBarIcon: ({ color, size }) => {
                return <Ionicons name="ios-earth" size={size} color={color} />;
              },
            }}
          />
        )}
        {role == "Admin" && (
          <Tab.Screen
            name="Overview"
            component={Admin_History}
            options={{
              tabBarIcon: ({ color, size }) => {
                return <Ionicons name="ios-earth" size={size} color={color} />;
              },
            }}
          />
        )}
        
      </Tab.Navigator>
    </Provider>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={HomeNonStack} />
          <Stack.Screen name="FixForm" component={FixForm} />
          <Stack.Screen name="Stat" component={Stat} />
          <Stack.Screen name="StaffForm" component={StaffForm} />
          <Tab.Screen name="Detail" component={Detail} />
          <Tab.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Stack = createNativeStackNavigator();
