import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";

import AdminHomeScreen from "../screens/web/admin/AdminHomeScreen";
import AdminRegisteredScreen from "../screens/web/admin/AdminRegisteredScreen";
import ProfileScreen from "../screens/web/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

function AdminCustomTabBar({ state, navigation }) {
  const { t } = useTranslation();
  
  
  const tabConfig = {
    AdminHomeTab: { 
      label: t("home"), 
      active: require("../images/home-active.png"), 
      inactive: require("../images/home.png") 
    },
    RegisteredTab: { 
      label: t("registered"),
      active: require("../images/calendar-active.png"), 
      inactive: require("../images/calendar.png") 
    },
    ProfileTab: { 
      label: t("profile"), 
      active: require("../images/profile-active.png"), 
      inactive: require("../images/profile.png") 
    },
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({ type: "tabPress", target: route.key });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const config = tabConfig[route.name];
        
        if (!config) return null;

        const iconSource = isFocused ? config.active : config.inactive;

        return (
          <TouchableOpacity 
            key={route.key} 
            onPress={onPress} 
            style={styles.tabButton} 
            activeOpacity={0.8}
          >
            <Image source={iconSource} style={styles.tabImage} />
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
              {config.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function AdminTabs() {
  return (
    <Tab.Navigator 
      screenOptions={{ headerShown: false }} 
      tabBar={(props) => <AdminCustomTabBar {...props} />}
    >
      <Tab.Screen name="AdminHomeTab" component={AdminHomeScreen} />
      <Tab.Screen name="RegisteredTab" component={AdminRegisteredScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#2B2B2B",
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
    height: 28,
  },
});