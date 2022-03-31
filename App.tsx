import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AuthStack from './src/navigation/AuthStack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AppDrawer from './src/navigation/AppDrawer';

const App = () => {
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
    console.log('user:', user);

    return subscriber; // unsubscribe on unmount
  }, [user]);

  return (
    <PaperProvider>
      <NavigationContainer>
        {user ? <AppDrawer /> : <AuthStack />}
        {/* <AuthStack /> */}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
