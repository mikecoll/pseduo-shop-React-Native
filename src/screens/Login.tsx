import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import LinearGradient from 'react-native-linear-gradient';

import LogoIcon from '../components/UI/Logo';
import { RootStateOrAny, useSelector } from 'react-redux';

const LoginScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { darkMode } = useSelector((state: RootStateOrAny) => state.ui);

  // TODO: Manual install google auth for Android
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      Alert.alert('Something went wrong!', error.message);
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={darkMode ? ['#3c3c3c', '#bababa'] : ['#ffffff', '#a8a8a8']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <View>
          <LogoIcon height={100} width={70} color={darkMode ? '#fff' : '#000'} />
        </View>
        <View>
          <Text style={{ fontSize: 50, color: darkMode ? '#fff' : '#000' }}>
            Pseudo Shop
          </Text>
          <Text style={[styles.text, { color: darkMode ? '#fff' : '#000' }]}>
            Free shipping worldwide
          </Text>
        </View>
      </View>
      <View style={{ width: '80%' }}>
        <Button
          onPress={signInWithGoogle}
          mode="contained"
          loading={loading}
          icon="google"
          color={darkMode ? '#d1b3ff' : '#6800ff'}
          style={{ margin: 5 }}
        >
          Log In With Google
        </Button>
        <Button mode="contained" icon="apple" color="#000" style={{ margin: 5 }}>
          Log In With Apple
        </Button>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50
  },
  text: {
    fontSize: 26,
    color: '#333',
    textAlign: 'center'
  },
  loginForm: {
    width: '80%'
  }
});

export default LoginScreen;
