import React, { Component } from "react";
import Banner from "./components/banner";
import { SafeAreaView, StatusBar } from "react-native";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <SafeAreaView>
                <Banner />
                <StatusBar backgroundColor="white" barStyle="dark-content" />
            </SafeAreaView>
        );
    }
}

export default App;
