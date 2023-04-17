import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeStackScreenProps, createNativeStackNavigator} from '@react-navigation/native-stack';
import PokeInput from './src/screens/PokeInput';
import PokeData from './src/screens/PokeData';

export type RootStackParamList = {
  PokeInput:undefined,
  PokeData: {val:string},
}

export type Navigation<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

const {Navigator , Screen} = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="PokeInput" screenOptions={{
        headerShown:false
      }}>
        <Screen name="PokeInput" component={PokeInput} />
        <Screen name="PokeData" component={PokeData} />
      </Navigator>
    </NavigationContainer>
  );
}
export default App;

const styles = StyleSheet.create({});
