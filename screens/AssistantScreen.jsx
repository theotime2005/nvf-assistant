import React, {useState} from "react";
import {ActivityIndicator, Text, View, StyleSheet} from "react-native";
import EnterMessage from "../components/EnterMessage";
import {chatSession} from "../gemini";
import AssistantAnswer from "../components/AssistantAnswer";
import { LinearGradient } from "expo-linear-gradient";

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
        // Mets à jour les messages en utilisant l'état précédent pour éviter les problèmes de mise à jour asynchrone
        setMessages((prevMessages) => [...prevMessages, message]);
        await sendToQuery(message.text);
        setIsLoading(false);
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
        <LinearGradient
            colors={['#A3C1DA', '#B0E0E6', '#87CEFA']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.container}
        >
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
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

})