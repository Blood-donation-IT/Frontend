import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LogInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  

  const handleSignUp = () => {
    // if (!email || !password) {
    //   Alert.alert("Помилка", "Заповни всі поля");
    //   return;
    // }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   Alert.alert("Невірний email", "Введи правильну адресу електронної пошти");
    //   return;
    // }

    navigation.navigate("Home");
  };


  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>SaveFlow</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail} />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSignUp()}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 32,
    alignSelf: 'center',
    color: '#000000',
    
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
    color: '#3A3A3A',
  },
  dropdown: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 32,
  },
  dropdownText: {
    color: '#C7C7CD',
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    borderRadius: 16,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    width: 160,
  },

  buttonText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 16,
  },


});
