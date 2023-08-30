import React, { useEffect } from "react";
import { SafeAreaView, View, TouchableOpacity, Text, Image, Dimensions, } from "react-native";
import styles from "./style";
import Header from '../../component/Header';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { formatpoint } from "../../global";

const WalletPoint = ({ navigation }) => {
    const { data } = useSelector((state) => state.postReducers)


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
            } else if (translateY.value < -height / 3) {
                translateY.value = withSpring(Max_TRANSLATE_Y, { damping: 50 });
            }
        });

    useEffect(() => {
        translateY.value = withSpring(Min_TRANSLATE_Y * 2.5, { damping: 50 });
    }, []);

    const BottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        }
    });

    const pointWallet = data?.data?.lWallet[1]?.amount; // Ví điểm

    return (
        <SafeAreaView style={styles.container}>
            <Header onPressLeft={() => navigation.goBack()}
                iconLeft={require('../../assets/imgSupplier/Arrow_1.png')}
                text='Ví điểm' />

            <View style={{ flexDirection: "row", }}>
                <View style={{ justifyContent: "center", }}>
                    <Text style={styles.text}>Số dư khả dụng</Text>
                    <Text style={styles.textmoney}>{formatpoint(pointWallet)}</Text>
                </View>
                <Image style={styles.imgWallet} source={require('../../assets/imgMainwallet/Vector.png')} />
            </View>
            <GestureHandlerRootView style={{ marginTop: height }} >
                <GestureDetector gesture={gesture}>
                    <Animated.View style={[{ alignItems: "center" }, BottomSheetStyle]}>
                        <View style={styles.bottomsheet}>
                            <View style={styles.line}></View>

                            <View style={{ padding: 20 }}>
                                <Text style={styles.title}>Chức năng ví</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('TransferMoney', { screen: 'WalletPoint' })} style={styles.view}>
                                    <View style={styles.view_2}>
                                        <View style={styles.borderIcon}>
                                            <Image style={styles.icon} source={require('../../assets/imgMainwallet/Rectangle_431.png')} />
                                        </View>
                                        <Text style={styles.text_2}>Chuyển tiền</Text>
                                    </View>
                                    <Image style={styles.imgArrow} source={require('../../assets/imgMainwallet/Rectangle_424.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { navigation.navigate('WalletHistory') }} style={styles.view}>
                                    <View style={styles.view_2}>
                                        <View style={styles.borderIcon}>
                                            <Image style={styles.icon} source={require('../../assets/imgMainwallet/Rectangle_432.png')} />
                                        </View>
                                        <Text style={styles.text_2}>Lịch sử</Text>
                                    </View>
                                    <Image style={styles.imgArrow} source={require('../../assets/imgMainwallet/Rectangle_424.png')} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Animated.View>
                </GestureDetector>
            </GestureHandlerRootView>
        </SafeAreaView >
    )
};

export default React.memo(WalletPoint);