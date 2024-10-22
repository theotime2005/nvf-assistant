import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from "./screens/WelcomeScreen";
import StepScreen from "./screens/StepScreen";
import AssistantScreen from "./screens/AssistantScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName={"welcome"}>
              <Stack.Screen name={"welcome"} component={WelcomeScreen}/>
              <Stack.Screen name={"step"} component={StepScreen}/>
              <Stack.Screen name={"assistant"} component={AssistantScreen}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}
