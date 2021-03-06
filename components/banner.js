import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    isAvailableAsync,
} from "expo-ads-admob";
import React, { Component } from "react";
import { SafeAreaView, Alert, View, StyleSheet, ScrollView, Button, Text } from "react-native";

import Loading from "./loading";

const AD_MOB_REWARD_UNIT_ID = "ca-app-pub-1961385479154945/8954080963";
const AD_MOB_BANNER_UNIT_ID1 = "ca-app-pub-1961385479154945/7983833978";
const AD_MOB_BANNER_UNIT_ID2 = "ca-app-pub-1961385479154945/8224588696";

//INTERSTITIAL
const AD_MOB_INTERSTITIAL_UNIT_ID = [
    "ca-app-pub-1961385479154945/3688176373",
    "ca-app-pub-1961385479154945/8702035187",
    "ca-app-pub-1961385479154945/6075871840",
    "ca-app-pub-1961385479154945/7968178643",
    "ca-app-pub-1961385479154945/5884300152",
    "ca-app-pub-1961385479154945/5342015300",
    "ca-app-pub-1961385479154945/4028933637",
];
const TOTAL_ADS_PER_BUTTON = AD_MOB_INTERSTITIAL_UNIT_ID.length;

class Banner extends Component {
    state = {
        disableInterstitialBtn: [false, false, false, false, false],
        disableRewardedBtn: false,
        loadingShow: false,
        loadingMessage: "",
    };
    async componentDidMount() {
        this.openInterstitial = this.openInterstitial.bind(this);
        try {
            await AdMobRewarded.setAdUnitID(AD_MOB_REWARD_UNIT_ID);
        } catch (error) {}
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
                    await AdMobInterstitial.setAdUnitID(AD_MOB_INTERSTITIAL_UNIT_ID[totalCloses]);
                    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
                    await AdMobInterstitial.showAdAsync();
                }
            });
            let newState = { ...this.state };

            newState.loadingMessage =
                "Loading Ad " + (totalCloses + 1).toString() + " of " + TOTAL_ADS_PER_BUTTON;
            newState.loadingShow = true;
            this.setState(newState);
            await AdMobInterstitial.setAdUnitID(AD_MOB_INTERSTITIAL_UNIT_ID[totalCloses]);
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
            await AdMobInterstitial.showAdAsync();
        } catch (error) {
            let newState = { ...this.state };
            newState.loadingShow = false;
            newState.loadingMessage = "";
            this.setState(newState);
            Alert.alert("Error", error.toString());
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
            Alert.alert("Wait", "First complete all upper tasks");
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
            AdMobRewarded.addEventListener("rewardedVideoDidClose", () => {
                let newState = { ...this.state };
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
            let newState = { ...this.state };
            newState.loadingShow = false;
            newState.loadingMessage = "";
            this.setState(newState);
            Alert.alert("Error", error.toString());
        }
    };

    render() {
        return (
            <View>
                <ScrollView
                    contentContainerStyle={{
                        alignItems: "center",
                        position: "relative",
                        margin: 20,
                    }}
                >
                    <View style={styles.addContainer}>
                        <View style={{ alignItems: "center", marginBottom: 10 }}>
                            <AdMobBanner
                                onDidFailToReceiveAdWithError={(error) => {}}
                                bannerSize="mediumRectangle"
                                adUnitID={AD_MOB_BANNER_UNIT_ID1}
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

                        <View style={{ alignItems: "center", marginTop: 20 }}>
                            <AdMobBanner
                                onDidFailToReceiveAdWithError={(error) => {}}
                                bannerSize="banner"
                                adUnitID={AD_MOB_BANNER_UNIT_ID2}
                            />
                        </View>
                        <View style={{ alignItems: "center", marginBottom: 40, marginTop: 20 }}>
                            <PublisherBanner
                                onDidFailToReceiveAdWithError={(error) => {}}
                                bannerSize="largeBanner"
                                adUnitID={AD_MOB_BANNER_UNIT_ID2}
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
        margin: 20,
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
        marginTop: 30,
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
