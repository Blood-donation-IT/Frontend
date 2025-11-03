import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GetBookScreen from "../screens/GetBookScreen";
import BookScreen from "../screens/BookScreen";


const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        let iconSource;
        if (route.name === "Home") {
          iconSource = isFocused
            ? require("../images/home-active.png")
            : require("../images/home.png");
        } else if (route.name === "GetDonorBook") {
          iconSource = isFocused
            ? require("../images/bookIcon.png")
            : require("../images/bookIcon.png");
        } else if (route.name === "Profile") {
          iconSource = isFocused
            ? require("../images/profile.png")
            : require("../images/profile.png");
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
            activeOpacity={0.8}
          >
            <Image
              source={iconSource}
              style={{ width: 28, height: 28}}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="GetDonorBook" component={GetBookScreen} />
      <Tab.Screen
        name="BookScreen"
        component={BookScreen}
        options={{ tabBarButton: () => null, headerShown: false }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#2B2B2B",
    // marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 33,
    paddingVertical: 15,
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
});
