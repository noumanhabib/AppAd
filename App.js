import "react-native-gesture-handler";
import React, { Component } from "react";
import Banner from "./components/banner";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={Banner}
                        options={{
                            headerTitle: "Home",
                            headerLeft: null,
                            headerTintColor: "white",
                            headerStyle: { backgroundColor: "black" },
                        }}
                    />
                </Stack.Navigator>
                <StatusBar backgroundColor="black" barStyle="light-content" />
            </NavigationContainer>
        );
    }
}

export default App;
