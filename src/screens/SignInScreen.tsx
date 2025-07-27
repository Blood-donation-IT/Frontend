import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const bloodTypes = ['1+', '1-', '2+', '2-', '3+', '3-', '4+', '4-'];

  const navigation = useNavigation();
  

  const handleSignUp = () => {
    if (!name || !lastName || !email || !password || !bloodType) {
      Alert.alert("Помилка", "Заповни всі поля");
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

      <Text style={styles.title}>SaveFlow</Text>

      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={name}
        onChangeText={setName} />

      <TextInput
        style={styles.input}
        placeholder="Your last name"
        value={lastName}
        onChangeText={setLastName} />

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

      <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
        <Text style={{ color: bloodType ? '#000' : '#999' }}>
          {bloodType || 'Blood Type'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.goToLogInButton}
        onPress={() => navigation.navigate('LogIn')}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSignUp()}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

    </ScrollView>

    <Modal
      visible={isModalVisible}
      transparent
      animationType="slide"
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {bloodTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={styles.modalItem}
              onPress={() => {
                setBloodType(type);
                setModalVisible(false);
              } }
            >
              <Text style={{ fontSize: 16 }}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>

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


  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  buttonText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 16,
  },

  goToLogInButton: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  },


});
