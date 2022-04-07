import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import AuthStack from './src/navigation/AuthStack';
import AppTabs from './src/navigation/AppTabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/store/index';
import Toast, { SuccessToast } from 'react-native-toast-message';

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer>
            {user ? <AppTabs /> : <AuthStack />}
            <Toast config={toastConfig} position="bottom" visibilityTime={2500} />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
