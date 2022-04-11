import React, { useEffect, useState } from 'react';
import { Alert, Appearance, LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Toast, { SuccessToast } from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AuthStack from './src/navigation/AuthStack';
import AppTabs from './src/navigation/AppTabs';
import { uiActions } from './src/store/uiSlice';

LogBox.ignoreAllLogs();

const toastConfig = {
  success: (props: any) => (
    <SuccessToast
      {...props}
      text1Style={{ fontSize: 18 }}
      text2Style={{ fontSize: 16 }}
      text2NumberOfLines={2}
    />
  )
};

const App = () => {
  const dispatch = useDispatch();

  Appearance.addChangeListener(scheme => {
    dispatch(uiActions.setTheme(scheme.colorScheme));
  });

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();

    dispatch(uiActions.setTheme(colorScheme));
  }, []);

  GoogleSignin.configure({
    webClientId:
      '200517880835-oe3r92cv3381r93pkfvjh22p9bu360qf.apps.googleusercontent.com'
  });

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, [user]);

  useEffect(() => {
    const checkForUser = async () => {
      try {
        const allUsers: any = [];

        const usersRef = await firestore().collection('users').get();

        usersRef.forEach(snapshot => {
          allUsers.push(snapshot.data());
        });

        const existingUser = allUsers.find(
          (u: { uid: string }) => u.uid === user?.uid
        );

        if (!existingUser) {
          addUser();
        }
      } catch (error: any) {
        Alert.alert('Something went wrong!', error.message);
      }
    };

    checkForUser();

    const addUser = async () => {
      firestore().collection('users').doc(auth().currentUser?.uid).set({
        uid: user?.uid,
        favorites: []
      });
    };
  }, [user]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          {user ? <AppTabs /> : <AuthStack />}
          <Toast config={toastConfig} position="bottom" visibilityTime={2500} />
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
