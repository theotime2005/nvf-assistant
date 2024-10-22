import React, { useState } from "react";
import { Text, View } from "react-native";
import EnterMessage from "../components/EnterMessage";

const initState = []; // Define initState

export default function AssistantScreen({ navigation }) {
    const [messages, setMessages] = useState(initState);

    const receiveMessage = (message) => {
        setMessages([...messages, message]); // Correct usage of spread operator
        // Send query to IA
    }

    return (
        <View>
            <Text>Discutez avec votre assistant préféré</Text>
            {messages.map((message, index) => (
                <View key={index}>
                    {message.type === "user" && (
                        <View>
                            <Text>Moi : </Text>
                            <Text>{message.text}</Text>
                        </View>
                    )}
                    {message.type === "assistant" && (
                        <View>
                            <Text>Assistant :</Text>
                            <Text>{message.text}</Text>
                        </View>
                    )}
                </View>
            ))}
            <EnterMessage onSendData={receiveMessage} />
        </View>
    );
}
