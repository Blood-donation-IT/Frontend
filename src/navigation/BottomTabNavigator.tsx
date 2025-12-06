import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, Image, StyleSheet ,Text } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useTranslation } from "react-i18next";
import GetBookScreen from "../screens/GetBookScreen";
import BookScreen from "../screens/BookScreen";


const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  const { t } = useTranslation();

  const tabConfig = {
    HomeTab: { label: t("home"), active: require("../images/home-active.png"), inactive: require("../images/home.png") },
    GetDonorBook: { label: t("donors_book"), active: require("../images/book-active.png"), inactive: require("../images/book.png") },
    ProfileTab: { label: t("profile"), active: require("../images/profile-active.png"), inactive: require("../images/profile.png") },
  };

  const isDonorBook = false;

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {

        if (route.name === "BookScreen") return null;

        const currentRoute = state.routes[state.index].name;

        const isFocused =
          currentRoute === route.name ||
          (currentRoute === "BookScreen" && route.name === "GetDonorBook");

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (event.defaultPrevented) return;

          if (route.name === "GetDonorBook") {
            if (isDonorBook) {
              navigation.navigate("BookScreen");
            } else {
              navigation.navigate("GetDonorBook");
            }
            return;
          }

          navigation.navigate(route.name);
        };


        const iconSource = isFocused
          ? tabConfig[route.name].active
          : tabConfig[route.name].inactive;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
            activeOpacity={0.8}
          >
            <Image source={iconSource} style={styles.tabImage} />
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {tabConfig[route.name].label}
            </Text>
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
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="GetDonorBook" component={GetBookScreen} />
      <Tab.Screen
        name="BookScreen"
        component={BookScreen}
        options={{ tabBarButton: () => null, headerShown: false }}
      />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
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
  tabLabel: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 4,
  },
  tabLabelActive: {
    color: "#E66A6A",
    fontWeight: "bold",
  },

  tabImage: {
    width: 28, 
    height: 28
  }
});
