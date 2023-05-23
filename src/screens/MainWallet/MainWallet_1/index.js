import React, { useEffect } from "react";
import { SafeAreaView, View, TouchableOpacity, Text, Image, Dimensions, } from "react-native";
import Style_WalletScreen from "./style";
import Header from "../../../component/Header";
import SwipeUpDown from 'react-native-swipe-up-down';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const WalletScreen = () => {
    const { width: width, height: height } = Dimensions.get('window');
    const translateY = useSharedValue(0);
    const Max_TRANSLATE_Y = -height + 50;
    const Min_TRANSLATE_Y = -height + 535;
    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value };
        })
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y;
            translateY.value = Math.max(translateY.value, Max_TRANSLATE_Y);
            translateY.value = Math.min(translateY.value, Min_TRANSLATE_Y)
        })
        .onEnd(() => {
            if (translateY.value > -height / 2) {
                translateY.value = withSpring(Min_TRANSLATE_Y, { damping: 50 });
            } else if (translateY.value < -height / 2) {
                translateY.value = withSpring(Max_TRANSLATE_Y, { damping: 50 });
            }
        });

    useEffect(() => {
        translateY.value = withSpring(-height / 3, { damping: 50 });
    }, []);

    const BottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        }
    });

    return (
        <GestureHandlerRootView style={Style_WalletScreen.container}>
            {/* <SafeAreaView style={Style_WalletScreen.container}> */}
            <Header onPress={() => navigation.goBack()} iconLeft={require('../../../assets/imgSupplier/Arrow_1.png')} title={'Ví chính'} />
            <View style={{ flexDirection: "row", }}>
                <View style={{ justifyContent: "center", }}>
                    <Text style={Style_WalletScreen.text}>Số dư khả dụng</Text>
                    <Text style={Style_WalletScreen.textmoney}>1,770,000 VNĐ</Text>
                </View>
                <Image style={Style_WalletScreen.imgWallet} source={require('../../../assets/imgMainwallet/Vector.png')} />
            </View>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[{ alignItems: "center" }, BottomSheetStyle]}>
                    <View style={Style_WalletScreen.bottomsheet}>
                        <View style={Style_WalletScreen.line}></View>
                        <View style={{ padding: 20 }}>
                            <Text style={Style_WalletScreen.title}>Chức năng ví</Text>
                            <TouchableOpacity style={Style_WalletScreen.view}>
                                <View style={Style_WalletScreen.view_2}>
                                    <View style={Style_WalletScreen.borderIcon}>
                                        <Image style={Style_WalletScreen.icon} source={require('../../../assets/imgMainwallet/Rectangle_429.png')} />
                                    </View>
                                    <Text style={Style_WalletScreen.text_2}>Nạp tiền</Text>
                                </View>
                                <Image style={Style_WalletScreen.imgArrow} source={require('../../../assets/imgMainwallet/Rectangle_424.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={Style_WalletScreen.view}>
                                <View style={Style_WalletScreen.view_2}>
                                    <View style={Style_WalletScreen.borderIcon}>
                                        <Image style={Style_WalletScreen.icon} source={require('../../../assets/imgMainwallet/Rectangle_430.png')} />
                                    </View>
                                    <Text style={Style_WalletScreen.text_2}>Rút tiền</Text>
                                </View>
                                <Image style={Style_WalletScreen.imgArrow} source={require('../../../assets/imgMainwallet/Rectangle_424.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={Style_WalletScreen.view}>
                                <View style={Style_WalletScreen.view_2}>
                                    <View style={Style_WalletScreen.borderIcon}>
                                        <Image style={Style_WalletScreen.icon} source={require('../../../assets/imgMainwallet/Rectangle_431.png')} />
                                    </View>
                                    <Text style={Style_WalletScreen.text_2}>Chuyển tiền</Text>
                                </View>
                                <Image style={Style_WalletScreen.imgArrow} source={require('../../../assets/imgMainwallet/Rectangle_424.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={Style_WalletScreen.view}>
                                <View style={Style_WalletScreen.view_2}>
                                    <View style={Style_WalletScreen.borderIcon}>
                                        <Image style={Style_WalletScreen.icon} source={require('../../../assets/imgMainwallet/Rectangle_432.png')} />
                                    </View>
                                    <Text style={Style_WalletScreen.text_2}>Lịch sử</Text>
                                </View>
                                <Image style={Style_WalletScreen.imgArrow} source={require('../../../assets/imgMainwallet/Rectangle_424.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </GestureDetector>
            {/* </SafeAreaView> */}
        </GestureHandlerRootView>
    )
};

export default WalletScreen;