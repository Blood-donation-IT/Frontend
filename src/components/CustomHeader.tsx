import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "../Theme/ThemeContext";

interface CustomHeaderProps {
  title: string;
  navigation: any;
}

const CustomHeader = ({ title, navigation }: CustomHeaderProps) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    header: {
      backgroundColor: colors.backgroundMain,
      flexDirection: "row",
      alignItems: "center", 
      paddingTop: 50,       
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
    headerTitle: {
      color: colors.text,
      flex: 1,              
      textAlign: "center",
      fontSize: 18,
      fontWeight: "600",
    },
    sideElement: {
      width: 24,           
    }
  });

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.sideElement}
      >
        <Ionicons name="chevron-back" size={24} color={colors.text} />
      </TouchableOpacity>

      <Text style={styles.headerTitle} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.sideElement} />
    </View>
  );
};

export default CustomHeader;