import * as React from 'react';
import {View, Button, Text} from "react-native";

export default function WelcomeScreen({navigation}) {
    return (
        <View>
            <Text>Bienvenu. Ceci est une application de démonstration. Vous pouvez l'utiliser à des fins de test.</Text>
            <Button title={"Continuer"} onPress={() => navigation.navigate('step')}/>
        </View>
    );
};
