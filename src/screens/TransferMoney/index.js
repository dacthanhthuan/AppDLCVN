import React, { useState, useEffect } from "react";
import styles from "./styles";
import { FlatList, SafeAreaView, View, TouchableOpacity, Text, Image, TextInput, Alert, ActivityIndicator, RefreshControl } from "react-native";
import Header from "../../component/Header/index";
import Input from "../../component/Input";
import CardMember from "../../component/CardMember";
import Button from "../../component/Button";
import Modal from "react-native-modal";
import CardSurplus from "../../component/CardSurplus";
import { WINDOW_HEIGHT, formatpoint, formatprice } from "../../global";
import { useSelector } from "react-redux";
import { fetchReferralList } from "../AddAddress/http";
import { useFocusEffect } from "@react-navigation/native";

const TransferMoney = ({ navigation, route }) => {

  // Màn hình trước đó
  const screen = route?.params || '';
  // console.log('screen1:>>', screen?.screen);

  const { data } = useSelector((state) => state.postReducers)
  const sessionToken = data?.data?.session_token;

  // Noi dung chuyển tiền mặc định
  const contentTransfer = data?.data?.fullname + " CHUYEN TIEN";

  const moneyWallet = data?.data?.lWallet[0]?.amount;
  const pointWallet = data?.data?.lWallet[1]?.amount;

  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredUser, setFilteredUser] = useState([]);
  const [keywork, setKeywork] = useState("");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isNote, setIsNote] = useState(contentTransfer);
  const [isAmount, setIsAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPage, setIsPage] = useState(1);
  const [isTotalRecord, setIsTotalRecord] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [initialUserList, setInitialUserList] = useState([]); // Lưu danh sách ban đầu

  // Gọi API danh sách thành viên
  const callAPIReferralList = async (page) => {

    try {
      const response = await fetchReferralList({
        'TOKEN': sessionToken,
        'PAGE': page
      })
      setFilteredUser(response?.data?.l)
      setInitialUserList(response?.data?.l)
      setIsTotalRecord(response?.data?.total_record)

      return response;
    } catch (error) {
      console.log('Error referral list:' + error);
    }
  }

  useEffect(() => {
    setIsLoading(true)
    setIsLoadMore(false)
    callAPIReferralList(1)
    setIsLoading(false)
    setIsLoadMore(true)
  }, [data])

  // Chức năng loadMore
  const loadMore = async () => {
    if (filteredUser?.length < isTotalRecord && isLoadMore && !isLoading) {
      setIsLoading(true)
      try {
        let newPage = isPage + 1;
        let response;

        response = await callAPIReferralList(newPage)

        if (response?.data?.l?.length > 0) {
          console.log('Fetched additional data:', response?.data?.l?.length, 'items');
          setFilteredUser([...filteredUser, ...response?.data?.l])
          setIsPage(newPage)
        }

        setIsLoading(false)
      } catch (error) {
        console.log('Error loadMore Referral List:', error);
      }
    } else {
      setIsLoading(false)
    }
  }

  // onRefresh
  const onRefreshs = () => {
    setRefreshing(true);
    setFilteredUser([])
    setIsPage(1);
    callAPIReferralList(1);
    setRefreshing(false);
  }


  // Bật bottomSheet
  const openBottomSheet = () => {
    if (!selectedItem) {
      Alert.alert('Thông báo', 'Vui lòng chọn thành viên')
    } else {
      setShowBottomSheet(true);
    }
  };

  // Tắt bottomSheet
  const closeBottomSheet = () => {
    setShowBottomSheet(false);
  };

  // Sự kiện chuyển qua màn hình TransfersMoney2
  const onPressContinue = () => {
    if (!isAmount) {
      Alert.alert('Thông báo', 'Vui lòng nhập số tiền')
    } else {
      navigation.navigate('TranferMoneyTwo',
        { item: { isNote, isAmount, selectedItem }, screen })
    }
  }

  // Hiện loading
  const renderFooter = () => {
    if (isLoading) {
      return (
        <View style={{ marginTop: 24 }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
    return null;
  }

  useFocusEffect(
    React.useCallback(() => {
      setShowBottomSheet(false)
    }, [selectedItem]) // Empty dependency array to run the effect every time the screen is focused
  );

  // console.log(selectedItem);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        iconLeft={require("../../assets/Arrow1.png")}
        text="Chuyển tiền"
        onPressLeft={() => { navigation.goBack() }}
      />

      <Input
        placeholder="Tìm kiếm thành viên"
        value={keywork}
        onChangeText={setKeywork}
      />

      <FlatList
        data={filteredUser}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 15, flex: 1 }}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => {
          const onPressCard = () => {
            setSelectedItem(item);
          };
          return (
            <CardMember key={item?.user_id} isSelected={item?.user_id === selectedItem?.user_id} item={item} onPress={onPressCard} />
          );
        }}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        refreshControl={
          < RefreshControl
            refreshing={refreshing}
            colors={['white']}
            progressBackgroundColor={'#005AA9'}
            onRefresh={onRefreshs}
          />
        }
      />

      <View style={{ alignItems: "center" }}>
        <Button
          text="Tiếp theo"
          style={{ bottom: WINDOW_HEIGHT * 0, width: "90%" }}
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

          {/* Phần hiện Bottom */}
          <CardSurplus
            title={screen?.screen === 'WalletMoney' ? 'Số dư ví chính' : 'Số dư ví điểm'}
            money={screen?.screen === 'WalletMoney' ? formatprice(moneyWallet) : formatpoint(pointWallet)}
            onPress={() => {
              {
                screen?.screen === 'WalletMoney' ?
                  navigation.navigate('WalletMoney') :
                  navigation.navigate('WalletPoint')
              }
            }}
            style={{ marginTop: 35 }} />

          <Text style={styles.title}>Bạn muốn chuyển bao nhiêu ?</Text>

          <TextInput
            style={styles.value}
            placeholder={screen?.screen === 'WalletMoney' ? '0Đ' : '0 Point'}
            placeholderTextColor='#C2C2C2'
            keyboardType="number-pad"
            value={isAmount}
            onChangeText={(text) => setIsAmount(text)}
          />

          <View style={styles.messContainer}>
            <Text style={styles.textMessage}>Lời nhắn</Text>
            <TextInput
              style={styles.messInput}
              placeholderTextColor='#C2C2C2'
              value={isNote}
              onChangeText={(text) => setIsNote(text)}
            />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Button onPress={() => {
              onPressContinue()
            }}
              text='Tiếp tục'
              style={{ width: '90%', top: WINDOW_HEIGHT * 0.03 }} />
          </View>

        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default React.memo(TransferMoney);
