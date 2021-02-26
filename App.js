import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import AuthNavigator from "./components/AuthNavigator"
import AuthContext from "./auth/context";
import storage from "./auth/storage";
import MainNavigator from "./components/MainNavigator"
import AppLoading from "expo-app-loading";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const restoreUser = async () => {
      const user = await storage.getUser();
      if (user) setUser(user);
  };

  if (!isReady)
      return (
          <AppLoading
              startAsync={restoreUser}
              onFinish={() => setIsReady(true)}
              onError={console.warn}
          />
      );
  return (
      <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <AuthContext.Provider value={{ user, setUser }}>
              {user ? <MainNavigator /> : <AuthNavigator />}
          </AuthContext.Provider>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
