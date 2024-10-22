import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

export default function WelcomeScreen({ navigation }) {
    const [animation] = React.useState(new Animated.Value(1));

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(animation, { toValue: 0.8, duration: 100, useNativeDriver: true }),
            Animated.timing(animation, { toValue: 1, duration: 100, useNativeDriver: true })
        ]).start();
    };

    const handlePress = () => {
        animateButton();
        setTimeout(() => navigation.navigate('step'), 200);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>
                Bienvenue. Ceci est une application de démonstration.
            </Text>
            <Text style={styles.subText}>
                Vous pouvez l'utiliser à des fins de test.
            </Text>
            <Animated.View style={{ transform: [{ scale: animation }] }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePress}
                >
                    <Text style={styles.buttonText}>Continuer</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});