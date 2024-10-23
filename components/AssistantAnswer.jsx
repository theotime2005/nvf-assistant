import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function AssistantAnswer({ answer }) {
    const [answerToDisplay, setAnswerToDisplay] = useState([]);

    useEffect(() => {
        const cleanText = () => {
            if (typeof answer !== 'string') return;
            // Sépare par lignes et nettoie en interprétant les listes et les paragraphes
            const lines = answer.split("\n").map(line => {
                if (line.startsWith("**")) {
                    // C'est une liste, retire les '**' et marque comme liste
                    return { type: "list", content: line.replace(/\*\*/g, "").trim() };
                } else {
                    // C'est un paragraphe normal
                    return { type: "paragraph", content: line.trim() };
                }
            });
            setAnswerToDisplay(lines);
        }
        cleanText();
    }, [answer]);

    return (
        <View>
            <Text>Assistant :</Text>
            {answerToDisplay.map((line, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                    {line.type === "list" ? (
                        <Text>• {line.content}</Text> // Affiche la liste avec un bullet point
                    ) : (
                        <Text>{line.content}</Text> // Affiche un paragraphe
                    )}
                </View>
            ))}
        </View>
    );
}
