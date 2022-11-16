// new

// import library ที่จำเป็น
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesScreen from "../screens/FavoritesScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// import screen ที่เกี่ยวข้อง
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FiltersScreen from "../screens/FiltersScreen";

// สร้าง navigator ตามโจทย์กำหนด
const MealsNavigator = createNativeStackNavigator();
const FavNavigator = createNativeStackNavigator();
const MealsFavTabNavigator = createBottomTabNavigator();
const FiltersNavigator = createNativeStackNavigator();
const MainNavigator = createDrawerNavigator();

// สร้าง function สำหรับการกำหนด Navigator แต่ละตัว เช่น
function MealNavigator() {
  return (
    // กำหนดรายละเอียดของ navigator
    <MealsNavigator.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4a148c",
        },
        headerTintColor: "white",
      }}
    >
      <MealsNavigator.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          headerShown: false,
        }}
      />
      <MealsNavigator.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={({ route }) => ({
          title: route.params.categoryTitle.toString(),
        })}
      />
      <MealsNavigator.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => ({
          title: route.params.mealTitle.toString(),
        })}
      />
    </MealsNavigator.Navigator>
  );
}

// อาจกำหนด Navigator เพิ่มได้
function FavoriteNavigator() {
  return (
    // กำหนดรายละเอียดของ navigator
    <FavNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4a148c",
        },
        headerTintColor: "white",
      }}
    >
      <FavNavigator.Screen name="Favorites" component={FavoritesScreen} />
      <FavNavigator.Screen name="MealDetail" component={MealDetailScreen} />
    </FavNavigator.Navigator>
  );
}

function filterNavigator() {
  return (
    <FiltersNavigator.Navigator>
      <FiltersNavigator.Screen name="Filters" component={FiltersScreen} />
    </FiltersNavigator.Navigator>
  );
}

function mealsFavTabNavigator() {
  return (
    <MealsFavTabNavigator.Navigator screenOptions={{ headerShown: false }}>
      <MealsFavTabNavigator.Screen
        name="Meals"
        component={MealNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="ios-restaurant" size={size} color={color} />;
          },
        }}
      />
      <MealsFavTabNavigator.Screen
        name="Favorites"
        component={FavoriteNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="ios-star" size={size} color={color} />;
          },
        }}
      />
    </MealsFavTabNavigator.Navigator>
  );
}

// สร้าง Navigator หลัก
export default function MyNavigator() {
  return (
    <NavigationContainer>
      {/* รายละเอียดของ Navigator หลัก (MainNavigator) */}
      <MainNavigator.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#4a148c",
          },
          headerTintColor: "white",
        }}
      >
        <MainNavigator.Screen
          name="MealsFav"
          component={mealsFavTabNavigator}
          options={{ drawerLabel: "Meals", title: "Meal Categories" }}
        />
        <MainNavigator.Screen name="Filters" component={filterNavigator} />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
}
