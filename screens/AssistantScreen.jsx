import React, { useState } from "react";
import { Text, View } from "react-native";
import EnterMessage from "../components/EnterMessage";
import {chatSession} from "../gemini";

const initState = []; // Initialise avec un tableau vide

export default function AssistantScreen({ navigation }) {
    const [messages, setMessages] = useState(initState);

    const receiveMessage = async (message) => {
        // Mets à jour les messages en utilisant l'état précédent pour éviter les problèmes de mise à jour asynchrone
        setMessages((prevMessages) => [...prevMessages, message]);
        await sendToQuery(message.text);
    };

    const sendToQuery = async (message) => {
        try {
            const result = await chatSession.sendMessage(message);
            const response = result.response.text();
            setMessages((prefMessages) => [...prefMessages, {
                type: "assistant",
                text: response
            }]);
        } catch (e) {
            console.error(e);
            setMessages((prefMessages) => [...prefMessages, {
                type: "assistant",
                text: "Je suis désolé, je n'ai pas pu comprendre votre message"
            }])
        }
    };

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
