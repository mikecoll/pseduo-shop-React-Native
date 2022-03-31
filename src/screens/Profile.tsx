import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  const signOutHandler = async () => {
    await auth().signOut();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>PROFILE SCREEN</Text>
      <Button onPress={signOutHandler}>Logout</Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;
