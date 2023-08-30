import React from 'react'
import { View, Image, Dimensions } from 'react-native'

const { height } = Dimensions.get('window')

const BannerSmall = ({ item }) => {
    return (
        <View style={{ paddingHorizontal: 16 }}>
            <Image style={{ width: '100%', height: height * 0.20, borderRadius: 25 }} source={{ uri: item?.banner }} />
        </View>
    )
}

export default React.memo(BannerSmall);
