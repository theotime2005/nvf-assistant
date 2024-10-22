import React from "react";
import {Text, View} from "react-native";
import {CheckBox} from "react-native-web";

export default function StepScreen({navigation}) {
    return (
        <View>
            <Text>Cette application est un prototype destiné a montrer l'inclusion d'un assistant pour des voyages. Pour l'utiliser, des informations tel que votre nom et prénom seront partagées à notre IA.</Text>
            <CheckBox>Je comprend et j'accepte</CheckBox>
        </View>
    )
}
