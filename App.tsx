import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PokeInput from './src/screens/PokeInput';
import PokeData from './src/screens/PokeData';

export type RootStackParamList = {
  PokeInput: undefined,
  PokeData: {val:string},
}
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PokeInput" screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name="PokeInput" component={PokeInput} />
        <Stack.Screen name="PokeData" component={PokeData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

const styles = StyleSheet.create({});
