import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

export default function EnterMessage({onSendData}) {
    const [textMessage, setTextMessage] = useState("");
    const handleTextMessage = () => {
        onSendData({
            type: "user",
            text: textMessage
        });
        setTextMessage("");
    }
    return (
        <View>
            <TextInput
                value={textMessage}
                onChangeText={setTextMessage}
                placeholder="Votre message"
                onSubmitEditing={() => handleTextMessage()}
            />
            <Button
                title="Envoyer"
                onPress={() => handleTextMessage()} />
        </View>
    )
}
