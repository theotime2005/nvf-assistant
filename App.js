import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from "./screens/WelcomeScreen";
import StepScreen from "./screens/StepScreen";
import AssistantScreen from "./screens/AssistantScreen";

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer accessibilityLanguage="fr">
            <Stack.Navigator initialRouteName={"welcome"}>
                <Stack.Screen name={"welcome"} component={WelcomeScreen} options={{
                    title: "Bienvenue"
                }}/>
                <Stack.Screen name={"step"} component={StepScreen} options={{
                    title: "Avant de commencer"
                }}/>
                <Stack.Screen name={"assistant"} component={AssistantScreen} options={{
                    title: "Discuter avec l'assistant",
                    headerBackVisible: false
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
