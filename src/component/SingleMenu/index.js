import React from 'react';
import { TouchableOpacity, Image, View, Text, FlatList } from 'react-native';
import styles from './styles';

const SingleMenu = ({ madh, date, time, imageMore, name, price, slSp, total, style }) => {

    const slicedImages = imageMore?.length ? imageMore.slice(0, 5) : [];
    const diffImages = imageMore?.length - slicedImages?.length + 1;

    return (
        <TouchableOpacity style={[styles.container, style]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#E8EEFF', borderRadius: 25, padding: 10, alignItems: 'center' }}>
                    <Image style={{ width: 29, height: 28 }} source={require('../../assets/Frame.png')} />
                </View>
                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                    <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Montserrat' }}>Mã đơn hàng: {madh}</Text>
                    <Text style={{ fontSize: 12, color: '#E7E7E7', marginTop: 5 }}>{date} - {time}</Text>
                </View>
                
            </View>
            <View style={styles.line}></View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <FlatList
                    data={slicedImages}
                    horizontal
                    renderItem={({ item, index }) => (
                        <View style={{ backgroundColor: '#E7E7E7', borderRadius: 25, alignItems: 'center', padding: 10, width: 45, height: 45, marginRight: 10 }}>
                            <Image style={{ width: 25, height: 25 }} source={item} />
                            {diffImages > 0 && index === slicedImages?.length - 1 ? (
                                <View style={styles.moreImagesContainer}>
                                    <Text style={styles.moreImages}>{`+${diffImages}`}</Text>
                                </View>
                            ) : null}
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Image style={{ width: 7, height: 13 }} source={require('../../assets/vectorRight.png')} />
            </View>

            <Text style={styles.textName}>{name}</Text>
            <Text style={styles.textName}><Text style={{ color: '#000000' }}>Giá bán:</Text> {price}đ</Text>
            <View style={styles.line}></View>

            <View style={styles.rowFooter}>
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Montserrat' }}>{slSp} sản phẩm</Text>
                <Text style={styles.textTotal}>{total}đ</Text>
            </View>

        </TouchableOpacity>
    )
}

export default React.memo(SingleMenu);
