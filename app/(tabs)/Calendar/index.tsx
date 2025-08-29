import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CalendarPage = () => {
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calendar</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    title: { fontSize: 24, marginBottom: 24 },
});

export default CalendarPage;