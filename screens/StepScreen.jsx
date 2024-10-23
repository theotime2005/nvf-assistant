import React from "react";
import {Button, Text, View} from "react-native";
import {CheckBox} from "react-native-web";

export default function StepScreen({navigation}) {
    return (
        <View>
            <Text>Cette application est un prototype destiné a montrer l'inclusion d'un assistant pour des voyages.</Text>
            <Button title={"D'accord, je continue"} onPress={() => navigation.navigate('assistant')}/>
        </View>
    )
}
