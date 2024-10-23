import React, {useState} from "react";
import {ActivityIndicator, Text, Vibration, View} from "react-native";
import EnterMessage from "../components/EnterMessage";
import {chatSession} from "../gemini";
import AssistantAnswer from "../components/AssistantAnswer";

const initState = []; // Initialise avec un tableau vide

export default function AssistantScreen({navigation}) {
    const [messages, setMessages] = useState([
        {
            type: "assistant",
            text: "Bonjour, comment puis-je vous aider ?"
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const receiveMessage = async (message) => {
        setIsLoading(true);
        Vibration.vibrate([100, 100, 200]);
        // Mets à jour les messages en utilisant l'état précédent pour éviter les problèmes de mise à jour asynchrone
        setMessages((prevMessages) => [...prevMessages, message]);
        await sendToQuery(message.text);
        setIsLoading(false);
        Vibration.vibrate([200, 100, 100]);
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
                            <AssistantAnswer answer={message.text}/>
                        </View>
                    )}
                </View>
            ))}
            {isLoading && (
                <ActivityIndicator style={{marginTop: 10}}/>
            )}
            <EnterMessage onSendData={receiveMessage}/>
        </View>
    );
}
