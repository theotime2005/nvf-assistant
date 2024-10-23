import React, { useState, useRef } from "react";
import { ActivityIndicator, Text, View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import EnterMessage from "../components/EnterMessage";
import { chatSession } from "../gemini";
import AssistantAnswer from "../components/AssistantAnswer";
import { LinearGradient } from "expo-linear-gradient";

export default function AssistantScreen({ navigation }) {
    const [messages, setMessages] = useState([
        {
            type: "assistant",
            text: "Bonjour, comment puis-je vous aider ?"
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewRef = useRef();

    const receiveMessage = async (message) => {
        setIsLoading(true);
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
            }]);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient
                colors={['#A3C1DA', '#B0E0E6', '#87CEFA']}
                style={styles.container}
            >
                <Text style={styles.title}>Assistant Nouvelles Frontières</Text>
                <ScrollView
                    style={styles.messagesContainer}
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                >
                    {messages.map((message, index) => (
                        <View key={index} style={message.type === "user" ? styles.userMessage : styles.assistantMessage}>
                            {message.type === "user" ? (
                                <Text style={styles.messageText}>{message.text}</Text>
                            ) : (
                                <AssistantAnswer answer={message.text} />
                            )}
                        </View>
                    ))}
                    {isLoading && (
                        <ActivityIndicator color="#ffffff" style={styles.loader} />
                    )}
                </ScrollView>
                <EnterMessage onSendData={receiveMessage} />
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
        textAlign: 'center',
    },
    messagesContainer: {
        flex: 1,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF',
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        maxWidth: '80%',
    },
    assistantMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#E5E5EA',
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        maxWidth: '80%',
    },
    messageText: {
        color: '#ffffff',
    },
    loader: {
        marginTop: 10,
    },
});