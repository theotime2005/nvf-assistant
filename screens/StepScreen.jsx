import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function StepScreen({navigation}) {
    const [animation] = React.useState(new Animated.Value(1));

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(animation, { toValue: 0.8, duration: 100, useNativeDriver: true }),
            Animated.timing(animation, { toValue: 1, duration: 100, useNativeDriver: true })
        ]).start();
    };

    const handlePress = () => {
        animateButton();
        setTimeout(() => navigation.navigate('assistant'), 200);
    };

    return (
             <LinearGradient
            colors={['#516648', '#3C4B35', '#263122']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.container}
        >
            <Text style={styles.pText}>Cette application est un prototype destiné à montrer une première version de la solution IZZY</Text>
            <TouchableOpacity
             style={styles.button}
             onPress={handlePress}
             accessibilityRole={"button"}
            >
                <Text style={styles.buttonText}>J'accède à l'interface</Text>
            </TouchableOpacity>
             </LinearGradient>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#FFF',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    pText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 40,
        color: '#FFF',
    },

    subText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 40,
        color: '#FFF',
    },
})
