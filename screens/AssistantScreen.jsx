import { Audio } from 'expo-av';
import React, { useState, useRef } from "react";
import { ActivityIndicator, Text, View, StyleSheet, ScrollView, SafeAreaView, Vibration, KeyboardAvoidingView, Platform, } from "react-native";
import EnterMessage from "../components/EnterMessage";
import { chatSession } from "../gemini";
import AssistantAnswer from "../components/AssistantAnswer";
import { LinearGradient } from "expo-linear-gradient";

export default function AssistantScreen({ navigation }) {
    const [messages, setMessages] = useState([
        {
            type: "assistant",
            text: "Bonjour, je suis izzy l'assistant virtuel de Nouvelles Frontières comment puis-je t'aider ?"
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewRef = useRef();

    async function playSound(loading) {
        if (!loading) {
            const {sound} = await Audio.Sound.createAsync(require("../assets/audio/end_response.wav"));
            await sound.playAsync();
        }
    }

    const receiveMessage = async (message) => {
        setIsLoading(true);
          Vibration.vibrate([100, 100, 200]);
        // Mets à jour les messages en utilisant l'état précédent pour éviter les problèmes de mise à jour asynchrone
        setMessages(prevMessages => [...prevMessages, message]);
        await sendToQuery(message.text);
        setIsLoading(false);
        Vibration.vibrate([200, 100, 100]);
    };

    const sendToQuery = async (message) => {
        try {
            const result = await chatSession.sendMessage(message);
            const response = result.response.text();
            await playSound(false);
            setMessages(prevMessages => [...prevMessages, {
                type: "assistant",
                text: response
            }]);
        } catch (e) {
            console.error(e);
            setMessages(prevMessages => [...prevMessages, {
                type: "assistant",
                text: "Je suis désolé, je n'ai pas pu comprendre votre message"
            }]);
        }
    };


    return (
        <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.safeArea}
    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
>
            <LinearGradient
                colors={['#516648', '#3C4B35', '#263122']}
                style={styles.container}
            >
                <Text style={styles.title}>Discutez avec Izzy ici</Text>
                <ScrollView
                    style={styles.messagesContainer}
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                >
                    {messages.map((message, index) => (
                        <View key={index} style={message.type === "user" ? styles.userMessage : styles.assistantMessage}>
                            {message.type === "user" ? (
                                <>
                                    <Text style={styles.userPrefix}>Vous :</Text>
                                    <Text style={styles.messageText}>{message.text}</Text>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.assistantPrefix}>Izzy :</Text>
                                    <AssistantAnswer answer={message.text} />
                                </>
                            )}
                        </View>
                    ))}
                    {isLoading && (
                        <ActivityIndicator color="#ffffff" style={styles.loader} />
                    )}
                </ScrollView>
                <EnterMessage onSendData={receiveMessage} />
            </LinearGradient>
        </KeyboardAvoidingView>
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
    userPrefix: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#1e90ff', // Bleu clair pour "Vous avez dit"
        marginBottom: 4,
    },
    assistantPrefix: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#32cd32', // Vert pour "L'assistant a dit"
        marginBottom: 4,
    },
    messageText: {
        color: '#ffffff',
    },
    loader: {
        marginTop: 10,
    },
});
