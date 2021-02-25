import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from "expo-ads-admob";
import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView, Button, Text } from "react-native";

AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/5224354917");

class Banner extends Component {
    state = {
        disableInterstitialBtn1: false,
        disableInterstitialBtn2: false,
        disableInterstitialBtn3: false,
        disableInterstitialBtn4: false,
        disableInterstitialBtn5: false,
        disableRewardedBtn: false,
    };
    async componentDidMount() {
        await setTestDeviceIDAsync("EMULATOR");
    }

    openInterstitial1 = async () => {
        try {
            AdMobInterstitial.addEventListener("interstitialDidOpen", () => {
                let newState = { ...this.state };
                newState.disableInterstitialBtn1 = true;
                this.setState(newState);
            });
            await AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712"); // Test ID, Replace with your-admob-unit-id
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
            await AdMobInterstitial.showAdAsync();
        } catch (error) {
            /* console.error(error); */
        }
    };
    openInterstitial2 = async () => {
        try {
            AdMobInterstitial.addEventListener("interstitialDidOpen", () => {
                let newState = { ...this.state };
                newState.disableInterstitialBtn2 = true;
                this.setState(newState);
            });
            await AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712"); // Test ID, Replace with your-admob-unit-id
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
            await AdMobInterstitial.showAdAsync();
        } catch (error) {
            /* console.error(error); */
        }
    };
    openInterstitial3 = async () => {
        try {
            AdMobInterstitial.addEventListener("interstitialDidOpen", () => {
                let newState = { ...this.state };
                newState.disableInterstitialBtn3 = true;
                this.setState(newState);
            });
            await AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712"); // Test ID, Replace with your-admob-unit-id
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
            await AdMobInterstitial.showAdAsync();
        } catch (error) {
            /* console.error(error); */
        }
    };

    openInterstitial4 = async () => {
        try {
            AdMobInterstitial.addEventListener("interstitialDidOpen", () => {
                let newState = { ...this.state };
                newState.disableInterstitialBtn4 = true;
                this.setState(newState);
            });
            await AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712"); // Test ID, Replace with your-admob-unit-id
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
            await AdMobInterstitial.showAdAsync();
        } catch (error) {
            /* console.error(error); */
        }
    };
    openInterstitial5 = async () => {
        try {
            AdMobInterstitial.addEventListener("interstitialDidOpen", () => {
                let newState = { ...this.state };
                newState.disableInterstitialBtn5 = true;
                this.setState(newState);
            });
            await AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712"); // Test ID, Replace with your-admob-unit-id
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
            await AdMobInterstitial.showAdAsync();
        } catch (error) {
            /* console.error(error); */
        }
    };

    openRewarded = async () => {
        try {
            AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", () => {
                let newState = { ...this.state };
                newState.disableRewardedBtn = true;
                this.setState(newState);
            });

            await AdMobRewarded.requestAdAsync();
            await AdMobRewarded.showAdAsync();
        } catch (error) {
            /* console.error(error); */
        }
    };

    render() {
        return (
            <ScrollView>
                <SafeAreaView style={{ marginTop: 30 }}>
                    <View style={styles.container}>
                        <Text style={styles.title}>AdMod App</Text>
                    </View>
                    <View style={styles.addContainer}>
                        <Text h4>Banner Ad</Text>
                        <AdMobBanner
                            bannerSize="mediumRectangle"
                            adUnitID={"ca-app-pub-3940256099942544/6300978111"}
                            servePersonalizedAds // true or false
                        />

                        <Text h4>Publisher Banner</Text>
                        <PublisherBanner
                            bannerSize="banner"
                            adUnitID={"ca-app-pub-3940256099942544/6300978111"}
                        />
                        <Text h4>Interstitial Ad 1</Text>
                        <Button
                            title="Open Ad"
                            type="outline"
                            disabled={this.state.disableInterstitialBtn1}
                            onPress={this.openInterstitial1}
                        />
                        <Text h4>Interstitial Ad 2</Text>
                        <Button
                            title="Open Ad"
                            type="outline"
                            disabled={this.state.disableInterstitialBtn2}
                            onPress={this.openInterstitial2}
                        />
                        <Text h4>Interstitial Ad 3</Text>
                        <Button
                            title="Open Ad"
                            type="outline"
                            disabled={this.state.disableInterstitialBtn3}
                            onPress={this.openInterstitial3}
                        />
                        <Text h4>Interstitial Ad 4</Text>
                        <Button
                            title="Open Ad"
                            type="outline"
                            disabled={this.state.disableInterstitialBtn4}
                            onPress={this.openInterstitial4}
                        />
                        <Text h4>Interstitial Ad 5</Text>
                        <Button
                            title="Open Ad"
                            type="outline"
                            disabled={this.state.disableInterstitialBtn5}
                            onPress={this.openInterstitial5}
                        />
                        <Text h4>Rewarded Ad</Text>
                        <Button
                            title="Open Ad"
                            type="outline"
                            disabled={this.state.disableRewardedBtn}
                            onPress={this.openRewarded}
                        />
                    </View>
                </SafeAreaView>
            </ScrollView>
        );
    }
}

export default Banner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    title: {
        borderRadius: 6,
        backgroundColor: "#61dafb",
        color: "black",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
    },
    addContainer: {
        margin: 20,
    },
});
