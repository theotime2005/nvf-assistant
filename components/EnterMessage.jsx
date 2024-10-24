import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function EnterMessage({ onSendData }) {
    const [textMessage, setTextMessage] = useState("");

    const handleTextMessage = () => {
        if (!textMessage) return;
        onSendData({
            type: "user",
            text: textMessage
        });
        setTextMessage("");
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={textMessage}
                onChangeText={setTextMessage}
                placeholder="Votre message"
                placeholderTextColor="#999"
                onSubmitEditing={textMessage ? handleTextMessage : null}
            />
            <TouchableOpacity
                style={[styles.sendButton, !textMessage && styles.sendButtonDisabled]}
                onPress={handleTextMessage}
                disabled={!textMessage}
            >
                <Ionicons name="send" size={24} color={textMessage ? "#007AFF" : "#999"} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginTop: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
    },
    sendButton: {
        padding: 10,
    },
    sendButtonDisabled: {
        opacity: 0.5,
    },
});