import { useAuth } from '@/app/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';


export default function ChangeProfileScreen() {
 const { user } = useAuth();

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity onPress={() => router.back()}>
                <Ionicons size={28} name="arrow-back-outline" color="#000" />
              </TouchableOpacity>
      <Text style={{ fontSize: 18 }}><Ionicons name="person" size={32} color="#000"/> Dobrodošao na Stranicu gde menjas svoje korisnicke podatke</Text>
      
      <Text style={{ fontSize: 16 }}>Korisnik: {user.name ?? null} {user.surname ?? null}</Text>
      <Text style={{ fontSize: 16 }}>Email: {user.email ?? null}</Text>
      <Text style={{ fontSize: 16 }}>ID ULOGOVANOG KORISNIKA: {user.id ?? null}</Text>
    </View>
  );
}
