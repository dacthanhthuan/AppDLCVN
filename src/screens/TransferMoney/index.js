import React, { useState, useEffect } from "react";
import styles from "./styles";
import { FlatList, SafeAreaView, View, TouchableOpacity, Text, Image, TextInput } from "react-native";
import Header from "../../component/Header";
import Input from "../../component/Input";
import CardMember from "../../component/CardMember";
import Button from "../../component/Button";
import Modal from "react-native-modal";
import CardSurplus from "../../component/CardSurplus";

const data = [
  {
    image: require('../../assets/member.png'),
    name: 'Lê Thành Tín',
    phone: '0839020007'
  },
  {
    image: require('../../assets/member1.png'),
    name: 'Trần Thiện Lâm',
    phone: '0839020007'
  },
  {
    image: require('../../assets/member2.png'),
    name: 'Lê Văn Long',
    phone: '0839020007'
  },
  {
    image: require('../../assets/member3.png'),
    name: 'Lê Thu Mai',
    phone: '0839020007'
  },
  {
    image: require('../../assets/member1.png'),
    name: 'Nguyễn Văn A',
    phone: '0839020007'
  },
  {
    image: require('../../assets/member2.png'),
    name: 'Lê Như Ngọc Mai',
    phone: '0839020007'
  },

];

const TransferMoney = ({navigation}) => {
  const [filteredUser, setFilteredUser] = useState(data);
  const [keywork, setKeywork] = useState("");
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  useEffect(() => {
    if (keywork?.length > 0) {
      const filteredItems = data?.filter(
        (rec) =>
          rec?.name?.toLocaleLowerCase()?.includes(keywork?.toLocaleLowerCase())
      );
      setFilteredUser(filteredItems);
    } else {
      setFilteredUser(data);
    }
  }, [keywork]);

  const openBottomSheet = () => {
    setShowBottomSheet(true);
  };

  const closeBottomSheet = () => {
    setShowBottomSheet(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        iconLeft={require("../../assets/Arrow1.png")}
        text="Chuyển tiền"
        iconRight={require("../../assets/white.png")}
        onPressLeft={()=>{navigation.goBack()}}
      />

      <Input
        placeholder="Tìm kiếm thành viên"
        value={keywork}
        onChangeText={setKeywork}
      />

      <FlatList
        data={filteredUser}
        style={{ marginTop: 15, flex: 1 }}
        renderItem={({ item }) => {
          return (
            <CardMember image={item.image} name={item.name} phone={item.phone} />
          );
        }}
      />

      <View style={{ alignItems: "center" }}>
        <Button
          text="Tiếp theo"
          style={{ bottom: -35, width: "90%" }}
          onPress={openBottomSheet}
        />
      </View>

      <Modal
        isVisible={showBottomSheet}
        onBackdropPress={closeBottomSheet}
        style={styles.bottomSheet}
      >
        <View style={styles.bottomSheetContent}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text></Text>
            <Text style={{ fontSize: 20, color: '#005AA9' }}>Chuyển tiền</Text>
            <TouchableOpacity onPress={closeBottomSheet}>
              <Image style={{ width: 24, height: 24 }} source={require('../../assets/Rectangle328.png')} />
            </TouchableOpacity>
          </View>

          <CardSurplus style={{ marginTop: 35 }} />

          <Text style={styles.title}>Bạn muốn chuyển bao nhiêu ?</Text>

          <TextInput
            style={styles.value}
            placeholder="0Đ"
            placeholderTextColor='#C2C2C2'
            keyboardType="number-pad"

          />

          <View style={styles.messContainer}>
            <Text style={styles.textMessage}>Lời nhắn</Text>
            <TextInput
              style={styles.messInput}
              placeholderTextColor='#C2C2C2'
            />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Button onPress={() => navigation.navigate('TranferMoneyTwo')} text='Tiếp tục' style={{ width: '90%', bottom: -50 }} />
          </View>

        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default React.memo(TransferMoney);
