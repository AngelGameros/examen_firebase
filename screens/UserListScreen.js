import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, 'usuarios'));
    const userList = snapshot.docs.map(doc => doc.data());
    setUsers(userList);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Auth');
    } catch (error) {
      Alert.alert('Error al cerrar sesión', error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios Registrados</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#eef2f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  userCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  email: { fontSize: 16, color: '#333' },
  logoutButton: {
    backgroundColor: '#c62828',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
