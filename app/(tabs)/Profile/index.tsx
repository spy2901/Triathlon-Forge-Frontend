import { useAuth } from '@/app/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';


export default function HomeScreen() {
 const { user } = useAuth();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Dobrodošao!</Text>
      <Text style={{ fontSize: 16 }}>Korisnik: {user.name ?? null} {user.surname ?? null}</Text>
      <Text style={{ fontSize: 16 }}>Email: {user.email ?? null}</Text>
      <Text style={{ fontSize: 16 }}>ID ULOGOVANOG KORISNIKA: {user.id ?? null}</Text>
    </View>
  );
}
