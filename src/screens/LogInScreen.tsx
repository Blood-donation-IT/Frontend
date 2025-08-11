import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LogInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  

  const handleSignUp = () => {
    if (!email || !password) {
      Alert.alert("Помилка", "Заповни всі поля");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Невірний email", "Введи правильну адресу електронної пошти");
      return;
    }

    navigation.navigate("Home");
  };


  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>OneDrop</Text>
      
      <View style={styles.BoxOfInputs}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#A1A1A1"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail} />

        <TextInput
          style={styles.input}
          placeholderTextColor="#A1A1A1"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword} />
      </View>

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
    justifyContent: 'space-evenly',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily:"inter",
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 32,
    alignSelf: 'center',
    color: '#000000',
    
  },
  input: {
    height: 44,
    borderColor: '#A1A1A1',
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor:"#F5EDEB",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    borderRadius: 16,
    backgroundColor: '#ED5A5A',
    alignSelf: 'center',
    width: 160,
    marginBottom:"20%",
  },

  buttonText: {
    color: '#FAFAFA',
    fontWeight: '600',
    fontSize: 16,
  },

  BoxOfInputs: {
    marginBottom:"-20%",
  },

});
