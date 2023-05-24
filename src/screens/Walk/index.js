import React, { useState } from "react";
import { SafeAreaView, Image, View, Text, Dimensions, TouchableOpacity, FlatList } from "react-native";
import Style_Walk from "./style";
import Header from "../../component/Header";
import Button from "../../component/Button";

const Walk = () => {
    const { width: widthWindow } = Dimensions.get('window');
    const [isTab, setTab] = useState('Đi bộ');
    const [isDatetime, setDatetime] = useState('Ngày');

    const listtab = [
        {
            "action": "Đi bộ",
        },
        {
            "action": "Chạy bộ"
        }
    ]

    const listdatetime = [
        {
            "datetime": "Ngày"
        },
        {
            "datetime": "Tuần"
        },
        {
            "datetime": "Tháng"
        },
    ]

    const listImage = [
        {
            "img": require('../../assets/imgWalk/Ellipse_96.png')
        },
        {
            "img": require('../../assets/imgWalk/Ellipse_97.png')
        },
        {
            "img": require('../../assets/imgWalk/Ellipse_98.png')
        },
    ]

    const setAction = isTab => {
        setTab(isTab)
    };

    const setDate = isDatetime => {
        setDatetime(isDatetime)
    };

    const render_tabWalk = () => {
        switch (isTab) {
            case 'Đi bộ':
                return (
                    <View>
                        <View style={Style_Walk.pressGift}>
                            <Image style={Style_Walk.iconGift} source={require('../../assets/imgWalk/Group_348.png')} />
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Image style={Style_Walk.imgCounter} source={require('../../assets/imgWalk/Group_349.png')} />
                        </View>
                        <View style={Style_Walk.viewButtonStart}>
                            <Button style={{ borderRadius: 30, paddingVertical: 10, }} text={'Bắt đầu'} />
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <View style={{ width: 200 }}>
                                <View style={Style_Walk.viewDatetime}>
                                    {
                                        listdatetime.map(e => (
                                            <TouchableOpacity
                                                key={e.datetime}
                                                onPress={() => setDate(e.datetime)}
                                                style={[{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 30, }, isDatetime === e.datetime ? { backgroundColor: '#D9D9D9' } : {}]}
                                            >
                                                <Text style={{ fontSize: 11, color: '#000000', fontWeight: "400" }}>{e.datetime}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            </View>
                        </View>
                        {render_tabDatetime()}
                    </View>
                );
            default:
                return null;
        }
    };

    const render_tabDatetime = () => {
        switch (isDatetime) {
            case 'Ngày':
                return (
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                            <View>
                                <View style={{ width: 30, height: 40, backgroundColor: '#D9D9D9', borderRadius: 5 }}></View>
                                <Text>11/7</Text>
                            </View>
                            <View>
                                <View style={{ width: 30, height: 40, backgroundColor: '#D9D9D9', borderRadius: 5 }}></View>
                                <Text>12/7</Text>
                            </View>
                            <View>
                                <View style={{ width: 30, height: 40, backgroundColor: '#D9D9D9', borderRadius: 5 }}></View>
                                <Text>13/7</Text>
                            </View>
                            <View>
                                <View style={{ width: 30, height: 40, backgroundColor: '#005AA9', borderRadius: 5 }}></View>
                                <Text>14/7</Text>
                            </View>
                            <View>
                                <View style={{ width: 30, height: 40, backgroundColor: '#005AA9', borderRadius: 5 }}></View>
                                <Text>15/7</Text>
                            </View>
                            <View>
                                <View style={{ width: 30, height: 40, backgroundColor: '#D9D9D9', borderRadius: 5 }}></View>
                                <View style={{ zIndex: 1000, marginTop: -20, width: 30, height: 20, backgroundColor: '#005AA9', borderRadius: 5 }}></View>
                                <Text>16/7</Text>
                            </View>
                            <View>
                                <View style={{ width: 30, height: 40, backgroundColor: '#D9D9D9', borderRadius: 5 }}></View>
                                <View style={{ zIndex: 1000, marginTop: -10, width: 30, height: 10, backgroundColor: '#005AA9', borderRadius: 5 }}></View>
                                <Text>17/7</Text>
                            </View>
                        </View>
                        <View style={Style_Walk.viewborder}>
                            <View style={{ flexDirection: "row" }}>
                                <Image style={{ width: 44, height: 44 }} source={require('../../assets/imgWalk/Group_351.png')} />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{}}>Nhóm của tôi</Text>
                                    <Text>7 thành viên</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <FlatList
                                    data={listImage}
                                    renderItem={render_image}
                                    horizontal={true}
                                />
                                <Image style={Style_Walk.iconGift} source={require('../../assets/imgWalk/Group_348.png')} />
                            </View>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    const render_image = ({ item }) => {
        return (
            <View>
                <Image style={{ width: 25, height: 25 }} source={item.img} />
            </View>
        )
    };
    return (
        <SafeAreaView style={Style_Walk.container}>
            <Header onPress={() => navigation.goBack()} iconLeft={require('../../assets/imgSupplier/Arrow_1.png')} title={''} />
            <View style={Style_Walk.viewImg}>
                <Image style={Style_Walk.imgWalk} source={require('../../assets/imgWalk/Rectangle_420.png')} />
            </View>
            <View style={Style_Walk.view_1}>
                <View style={[Style_Walk.view_2, { width: widthWindow }]}>
                    <View style={Style_Walk.view_3}>
                        {
                            listtab.map(e => (
                                <TouchableOpacity
                                    key={e.action}
                                    onPress={() => setAction(e.action)}
                                    style={[isTab === e.action ? Style_Walk.after_pressing : {}]}
                                >
                                    <Text style={Style_Walk.textTab}>{e.action}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    {render_tabWalk()}
                </View>
            </View>
        </SafeAreaView>
    )
};

export default Walk;