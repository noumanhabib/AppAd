import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
    isAvailableAsync,
    testID,
} from "expo-ads-admob";
import React, { Component } from "react";
import { SafeAreaView, Alert, View, StyleSheet, ScrollView, Button, Text } from "react-native";

import Loading from "./loading";

const AD_MOB_REWARD_UNIT_ID = "ca-app-pub-3940256099942544/5224354917";
const AD_MOB_INTERSTITIAL_UNIT_ID = "ca-app-pub-3940256099942544/1033173712";
const AD_MOB_BANNER_UNIT_ID = "ca-app-pub-3940256099942544/6300978111";

const TOTAL_ADS_PER_BUTTON = 7;

class Banner extends Component {
    state = {
        disableInterstitialBtn: [false, false, false, false, false],
        disableRewardedBtn: false,
        loadingShow: false,
        loadingMessage: "",
    };
    async componentDidMount() {
        this.openInterstitial = this.openInterstitial.bind(this);
        await AdMobRewarded.setAdUnitID(AD_MOB_REWARD_UNIT_ID);
        await AdMobInterstitial.setAdUnitID(AD_MOB_INTERSTITIAL_UNIT_ID);

        await setTestDeviceIDAsync("EMULATOR"); //only for testing
    }

    async openInterstitial(id = 0) {
        let totalCloses = 0;
        try {
            AdMobInterstitial.addEventListener("interstitialDidClose", async () => {
                totalCloses++;
                if (totalCloses >= TOTAL_ADS_PER_BUTTON) {
                    let newState = { ...this.state };
                    newState.disableInterstitialBtn[id] = true;
                    newState.loadingShow = false;
                    newState.loadingMessage = "";
                    this.setState(newState);
                    AdMobInterstitial.removeAllListeners();
                } else {
                    let newState = { ...this.state };
                    newState.loadingMessage =
                        "Loading Ad " +
                        (totalCloses + 1).toString() +
                        " of " +
                        TOTAL_ADS_PER_BUTTON;
                    this.setState(newState);
                    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
                    await AdMobInterstitial.showAdAsync();
                }
            });
            let newState = { ...this.state };
            newState.loadingMessage =
                "Loading Ad " + (totalCloses + 1).toString() + " of " + TOTAL_ADS_PER_BUTTON;
            newState.loadingShow = true;
            this.setState(newState);
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
            await AdMobInterstitial.showAdAsync();
        } catch (error) {
            newState.loadingShow = false;
            console.error(error);
        }
    }

    openRewarded = async () => {
        let flag = true;
        for (let i = 0; i < this.state.disableInterstitialBtn.length; i++) {
            if (!this.state.disableInterstitialBtn[i]) {
                flag = false;
                break;
            }
        }
        if (!flag) {
            Alert.alert("Error", "First complete all upper tasks");
            return;
        }
        try {
            AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", () => {
                let newState = { ...this.state };
                newState.disableRewardedBtn = true;
                newState.loadingShow = false;
                this.setState(newState);
                AdMobRewarded.removeAllListeners();
            });
            let newState = { ...this.state };
            newState.loadingShow = true;
            this.setState(newState);
            await AdMobRewarded.requestAdAsync();
            await AdMobRewarded.showAdAsync();
        } catch (error) {
            newState.loadingShow = false;
            console.error(error);
        }
    };

    render() {
        return (
            <View>
                <ScrollView
                    contentContainerStyle={{
                        marginTop: 30,
                        alignItems: "center",
                        position: "relative",
                    }}
                >
                    <View style={styles.addContainer}>
                        <View style={{ alignItems: "center", marginBottom: 10 }}>
                            <AdMobBanner
                                onDidFailToReceiveAdWithError={(error) => console.error("error")}
                                onAdFailedToLoad={(error) => console.error("error")}
                                bannerSize="mediumRectangle"
                                adUnitID={AD_MOB_BANNER_UNIT_ID}
                                servePersonalizedAds // true or false
                            />
                        </View>
                        <View style={styles.adBtn}>
                            <Button
                                title="Ad 1"
                                type="outline"
                                disabled={this.state.disableInterstitialBtn[0]}
                                onPress={() => this.openInterstitial(0)}
                            />
                        </View>
                        <View style={styles.adBtn}>
                            <Button
                                title="Ad 2"
                                type="outline"
                                disabled={this.state.disableInterstitialBtn[1]}
                                onPress={() => this.openInterstitial(1)}
                            />
                        </View>
                        <View style={styles.adBtn}>
                            <Button
                                title="Ad 3"
                                type="outline"
                                disabled={this.state.disableInterstitialBtn[2]}
                                onPress={() => this.openInterstitial(2)}
                            />
                        </View>
                        <View style={styles.adBtn}>
                            <Button
                                title="Ad 4"
                                type="outline"
                                disabled={this.state.disableInterstitialBtn[3]}
                                onPress={() => this.openInterstitial(3)}
                            />
                        </View>
                        <View style={styles.adBtn}>
                            <Button
                                title="Ad 5"
                                type="outline"
                                disabled={this.state.disableInterstitialBtn[4]}
                                onPress={() => this.openInterstitial(4)}
                            />
                        </View>
                        <View style={styles.adBtn}>
                            <Button
                                title="Reward"
                                disabled={this.state.disableRewardedBtn}
                                onPress={this.openRewarded}
                            />
                        </View>
                        <PublisherBanner
                            style={styles.banner}
                            bannerSize="banner"
                            adUnitID={AD_MOB_BANNER_UNIT_ID}
                        />
                        <View style={{ alignItems: "center", marginBottom: 40, marginTop: 20 }}>
                            <AdMobBanner
                                onDidFailToReceiveAdWithError={(error) => console.error("error")}
                                onAdFailedToLoad={(error) => console.error("error")}
                                bannerSize="mediumRectangle"
                                adUnitID={AD_MOB_BANNER_UNIT_ID}
                                servePersonalizedAds // true or false
                            />
                        </View>
                    </View>
                </ScrollView>
                <Loading show={this.state.loadingShow} loadingMessage={this.state.loadingMessage} />
            </View>
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
        zIndex: 1,
    },
    adBtn: {
        marginTop: 10,
        marginBottom: 10,
    },
    banner: {
        marginTop: 20,
    },
});
