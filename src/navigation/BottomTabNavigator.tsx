import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, Image, StyleSheet ,Text } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  const { t } = useTranslation()
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        let iconSource;
        if (route.name === "HomeTab") {
          iconSource = isFocused
            ? require("../images/home-active.png")
            : require("../images/home.png");
        } else if (route.name === "ProfileTab") {
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
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
              {/* {route.name === "HomeTab" ? "Home" : "Profile"} */}
              {route.name === "HomeTab" ? t("home") : t("profile")}
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
    justifyContent: "space-between",
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
});
