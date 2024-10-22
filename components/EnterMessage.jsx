import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

export default function EnterMessage({onSendData}) {
    const [textMessage, setTextMessage] = useState("");
    const handleTextMessage = () => {
        if (!textMessage) {
            return;
        }
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
                onSubmitEditing={textMessage ? () => handleTextMessage() : null}
            />
            <Button
                title="Envoyer"
                disabled={textMessage ? false : true}
                onPress={() => handleTextMessage()} />
        </View>
    )
}
