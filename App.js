import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './App/Screens/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import { CompleteChapterContext } from './App/Context/CompleteChapterContext';
import { useState } from 'react';
import { UserPointsContext } from './App/Context/UserPointsContext';


export default function App() {
  const [isChapterComplete, setIsChapterComplete] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-SemiBold.ttf'),
  });

  return (
    <ClerkProvider publishableKey={"pk_test_bGFyZ2UtdG9tY2F0LTkxLmNsZXJrLmFjY291bnRzLmRldiQ"}>
      <UserPointsContext.Provider value={{userPoints, setUserPoints}}>
      <CompleteChapterContext.Provider value={{isChapterComplete, setIsChapterComplete}}>
      <View style={styles.container}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigation /> 
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </View>
      </CompleteChapterContext.Provider>
      </UserPointsContext.Provider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
});