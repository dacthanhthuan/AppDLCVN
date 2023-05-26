import React from 'react';
import { Image, SafeAreaView, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import StyleSupplier from './style';
import data_supplier from '../../data/data_supplier/data';
import Search from '../../component/Search';

const Supplier = () => {
    const render_item = ({ item }) => {
        return (
            <TouchableOpacity style={StyleSupplier.container_2}>
                <Image style={StyleSupplier.imgSupplier} source={item.img} />
                <View>
                    <View style={StyleSupplier.container_3}>
                        <Text style={StyleSupplier.name}>{item.name}</Text>
                        <Text style={StyleSupplier.detail}>{item.detail}</Text>
                    </View>
                    <View style={StyleSupplier.container_4}>
                        <Text style={StyleSupplier.quantity}>{item.quantity}</Text>
                        <Text style={StyleSupplier.city}>{item.city}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={StyleSupplier.container}>
            <Text style={StyleSupplier.title}>Nhà cung cấp</Text>
            <View style={StyleSupplier.container_1}>
                <Search placeholder={'Tìm nhà cung cấp'} />
                <TouchableOpacity>
                    <Image style={StyleSupplier.imgSetting} source={require('../../assets/imgSupplier/Rectangle_313.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15 }}>
                <FlatList
                    data={data_supplier}
                    renderItem={render_item}
                    keyExtractor={(item, title) => title.toString()}
                />
            </View>
        </SafeAreaView>
    )
}

export default Supplier;