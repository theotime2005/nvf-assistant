import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function AssistantAnswer({ answer }) {
    const [answerToDisplay, setAnswerToDisplay] = useState([]);

    useEffect(() => {
        const cleanText = () => {
            if (typeof answer !== 'string') return;
            const lines = answer.split("\n").map(line => {
                if (line.startsWith("* **")) {
                    return { type: "list", content: line.split("*").join('').trim() };
                } else {
                    return { type: "paragraph", content: line.trim() };
                }
            });
            setAnswerToDisplay(lines);
        }
        cleanText();
    }, [answer]);

    return (
        <View>
            {answerToDisplay.map((line, index) => (
                <View key={index} style={styles.lineContainer}>
                    {line.type === "list" ? (
                        <Text style={styles.listItem}>• {line.content}</Text>
                    ) : (
                        <Text style={styles.paragraph}>{line.content}</Text>
                    )}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    lineContainer: {
        marginBottom: 5,
    },
    listItem: {
        fontSize: 14,
        color: '#333',
        marginLeft: 10,
    },
    paragraph: {
        fontSize: 14,
        color: '#333',
    },
});