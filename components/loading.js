import React from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";

export default function Loading({ show, loadingMessage }) {
    return (
        <View style={show ? styles.container : styles.nullContainer}>
            <View>
                <View>
                    <Text style={styles.message}>{loadingMessage}</Text>
                </View>
                <View style={styles.activity}>
                    <ActivityIndicator animating={show} size="large" color="#00ff00" />
                </View>
            </View>
        </View>
    );
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: width,
        height: height,
        position: "absolute",
        zIndex: 2,
        backgroundColor: "white",
        flexDirection: "column",
        marginTop: 20,
    },
    message: {
        fontSize: 20,
    },
    activity: {
        marginTop: height / 2 - 40,
    },
    nullContainer: {
        display: "none",
    },
});
