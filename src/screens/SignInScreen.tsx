import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();
  

  const handleSignUp = () => {
    if (!name || !email || !year || !password || !confirmPassword ) {
      Alert.alert("Помилка", "Заповни всі поля");
      return;
    }

    if (password != confirmPassword) {
      Alert.alert("Помилка", "Паролі не співпадають");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Невірний email", "Введи правильну адресу електронної пошти");
      return;
    }

    navigation.navigate("LogIn");
  };


  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>OneDrop</Text>

      <View style={styles.BoxOfInputs}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#A1A1A1"
          placeholder="Your name"
          value={name}
          onChangeText={setName} />

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
          placeholder="Your Year"
          value={year}
          onChangeText={setYear} />

        <TextInput
          style={styles.input}
          placeholderTextColor="#A1A1A1"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword} />

        <TextInput
          style={styles.input}
          placeholderTextColor="#A1A1A1"
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword} />
      </View>

      <View>


        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSignUp()}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.goToLogInButton}>
          <Text style={[styles.buttonText, { color: '#8C8C8C' }]}> Already have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('LogIn')}
          >
            <Text style={[styles.buttonText, { color: '#ED5A5A' }]}> Log in</Text>
          </TouchableOpacity>
        </View>


      </View>

    </ScrollView>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    gap:"10%",
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily:"inter",
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center',
    color: '#000000',
    
  },
  input: {
    height: 44,
    borderColor: '#A1A1A1',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor:"#F5EDEB",
  },


  BoxOfInputs: {
    marginBottom:"-7%"
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

  goToLogInButton: {
    flexDirection:"row",
    alignSelf: 'center',
    paddingHorizontal: 16,
    borderRadius:20,
    padding:5,
    marginBottom:"4%",
  },

});
