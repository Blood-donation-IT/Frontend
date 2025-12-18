import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import GoogleLogin from './googleLogin';

export default function LogInScreen() {
  const { t } = useTranslation();
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

      <Text style={styles.title}>OneDrop</Text>
      
      <View style={styles.BoxOfInputs}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#A1A1A1"
          placeholder={t("email")}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail} />

        <TextInput
          style={styles.input}
          placeholderTextColor="#A1A1A1"
          placeholder={t("password")}
          secureTextEntry
          value={password}
          onChangeText={setPassword} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSignUp()}
      >
        <Text style={styles.buttonText}>{t("log_in")}</Text>
      </TouchableOpacity>

      <View style={{ marginVertical: 20 }}>
        <GoogleLogin />
      </View> 

      <View style={styles.goToSignUpButton}>
        <Text style={[styles.buttonText, { color: '#8C8C8C' }]}> {t("dont_have_account")}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={[styles.buttonText, { color: '#ED5A5A' }]}> {t("sign_up")}</Text>
        </TouchableOpacity>
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
    marginBottom:"-6%",
  },

  goToSignUpButton: {
    flexDirection:"row",
    alignSelf: 'center',
    paddingHorizontal: 16,
    borderRadius:20,
    padding:5,
    marginBottom:"4%",
  },

});
