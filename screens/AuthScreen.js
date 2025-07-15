// screens/AuthScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function AuthScreen({ navigation }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigation.replace('UserList');
    });
    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      await setDoc(doc(db, 'usuarios', user.uid), {
        email: user.email,
        uid: user.uid,
        creado: new Date().toISOString(),
      });
      Alert.alert('Registro exitoso');
    } catch (error) {
      Alert.alert('Error al registrar', error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert('Error al iniciar sesión', error.message);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Registrarse' : 'Iniciar Sesión'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={isSignUp ? handleSignUp : handleSignIn}
      >
        <Text style={styles.buttonText}>
          {isSignUp ? 'Registrarse' : 'Iniciar Sesión'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleMode}>
        <Text style={styles.link}>
          {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: '#fff', padding: 12, borderRadius: 8,
    marginBottom: 15, borderColor: '#ccc', borderWidth: 1,
  },
  button: {
    backgroundColor: '#3f51b5', padding: 14, borderRadius: 8, marginBottom: 10,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  link: { color: '#3f51b5', textAlign: 'center' },
});
