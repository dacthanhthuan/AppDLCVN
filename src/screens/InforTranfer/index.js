import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import Header from "../../component/Header";
import Style_InforTranfer from "./style";
import Line from "../../component/Line";
import Button from "../../component/Button";

const InforTranfer = () => {
    return (
        <SafeAreaView style={Style_InforTranfer.container}>
            <Header onPress={() => navigation.goBack()}
                iconLeft={require('../../assets/imgSupplier/Arrow_1.png')}
                title={'Thông tin chuyển khoản'} />
            <Text style={[Style_InforTranfer.text_1, { marginBottom: 15 }]}>Thực hiện chuyển khoản theo thông tin dưới đây để hoàn tất nạp tiền</Text>
            <View style={Style_InforTranfer.viewborder}>
                <View style={{ marginTop: 10 }}>
                    <Text style={Style_InforTranfer.text_1}>Tên chủ tài khoản</Text>
                    <Text style={Style_InforTranfer.text_2}>CÔNG TY CỔ PHẦN DLCVN</Text>
                </View>
                <Line />
                <View style={{ marginTop: 10 }}>
                    <Text style={Style_InforTranfer.text_1}>Số tài khoản</Text>
                    <Text style={Style_InforTranfer.text_2}>373710027777</Text>
                </View>
                <Line />
                <View style={{ marginTop: 10 }}>
                    <Text style={Style_InforTranfer.text_1}>Số tiền cần chuyển</Text>
                    <Text style={Style_InforTranfer.text_2}>500,000đ</Text>
                </View>
            </View>
            <View style={{ paddingLeft: 30, paddingRight: 30 }}>
                <Line />
            </View>
            <View style={Style_InforTranfer.viewborder}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={Style_InforTranfer.text_1}>Nội dung chuyển tiền</Text>
                    <Text style={Style_InforTranfer.text_3}> (bắt buộc)</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                    <Text style={Style_InforTranfer.text_2}>DPDLTH87368243925U</Text>
                    <Text style={Style_InforTranfer.text_4}>Sao chép</Text>
                </View>
            </View>
            <View style={{ marginTop: 30, justifyContent: "space-between", height: '15%' }}>
                <Text style={Style_InforTranfer.text_5}>Lưu ý</Text>
                <Text style={Style_InforTranfer.text_1}>Giao dịch sẽ không được xử lí nếu sai nội dung chuyển khoản</Text>
                <Text style={Style_InforTranfer.text_1}>Sau khi chuyển khoản, vui lòng chờ để chúng tôi xác nhận giao dịch của bạn</Text>
            </View>
            <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30, }}>
                <View style={{ flex: 1 }}></View>
                <Button text={'Tiếp theo'} />
            </View>
        </SafeAreaView>
    )
};

export default InforTranfer;