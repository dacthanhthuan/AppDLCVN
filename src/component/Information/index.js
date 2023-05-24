import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Style_Information from "./style";

const Information = ({ text_1, text_2, text_3, price_1, price_2, price_3, style_1, style_2, style_3, style_4, style_5, style_6 }) => {
    return (
        <SafeAreaView style={Style_Information.container_1}>
            <View style={Style_Information.container_2}>
                <View style={Style_Information.container_3}>
                    <Text style={[Style_Information.text_1, style_1]}>{text_1}</Text>
                    <Text style={[Style_Information.text_1, style_2]}>{text_2}</Text>
                    <Text style={[Style_Information.text_1, style_3]}>{text_3}</Text>
                </View>
                <View style={Style_Information.container_4}>
                    <Text style={[Style_Information.price_1, style_4]}>{price_1}</Text>
                    <Text style={[Style_Information.price_2, style_5]}>{price_2}</Text>
                    <Text style={[Style_Information.price_3, style_6]}>{price_3}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default Information;