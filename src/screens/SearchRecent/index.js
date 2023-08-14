import React, {useState, useEffect, useCallback} from 'react';
import styles from './styles';
import {FlatList, SafeAreaView, Text} from 'react-native';
import Header from '../../component/Header';
import Input from '../../component/Input';
import CardRecent from '../../component/CardRecent';
import {useDispatch, useSelector} from 'react-redux';
import {
  addSearchRecent,
  mergeSearch,
  removeSearchRecent,
} from '../../redux/actions/searchRecentActions';

const SearchRecent = ({navigation}) => {
  const dispatch = useDispatch();
  const searchData = useSelector(state => state.search.data);
  const [filterSearch, setFilterSearch] = useState([]);
  const [keyword, setKeyword] = useState('');
  let searchRecentDebounceTimer;

  // function debounce search input
  const searchRecentDebounce = useCallback(
    search => {
      clearTimeout(searchRecentDebounceTimer);

      if (search.length == 0) {
        setFilterSearch(searchData);
      } else {
        searchRecentDebounceTimer = setTimeout(() => {
          const filterData = searchData.filter(item => {
            return item.includes(search.toLowerCase());
          });

          setFilterSearch(filterData);
        }, 300);
      }
    },
    [searchData],
  );

  // fucntion add search to search recent data
  const addSearch = search => {
    dispatch(addSearchRecent(search));
  };

  // function remove search from search recent data
  const removeSearch = search => {
    dispatch(removeSearchRecent(search));
  };

  // search feature
  useEffect(() => {
    searchRecentDebounce(keyword);
  }, [keyword]);

  // update search whenever search data has changed
  useEffect(() => {
    setFilterSearch(searchData);
  }, [searchData]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        iconLeft={require('../../assets/Arrow1.png')}
        text="Tìm kiếm"
        iconRight={require('../../assets/Vector.png')}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('Cart');
        }}
        showCartBadge={true}
        isWallet
      />

      <Input
        placeholder="Bạn cần tìm gì"
        onChangeText={setKeyword}
        value={keyword}
        onSubmitEditing={({nativeEvent}) => {
          if (nativeEvent?.text?.length > 0) {
            addSearch(nativeEvent.text);
          }
          navigation.navigate('SearchProduct', {text: nativeEvent?.text});
        }}
        focus
        onFocus={() => {
          setKeyword('');
        }}
      />

      <FlatList
        data={filterSearch}
        style={{marginTop: 15}}
        renderItem={({item, index}) => (
          <CardRecent
            text={item}
            onClose={() => {
              removeSearch(item);
            }}
            onPress={() => {
              addSearch(item);
              navigation.navigate('SearchProduct', {text: item});
            }}
          />
        )}
        ListEmptyComponent={
          <Text
            style={{
              paddingVertical: 15,
              fontSize: 14,
              color: '#000000',
              fontWeight: '400',
            }}>
            Không có tìm kiếm gần đây!
          </Text>
        }
        ListHeaderComponent={
          <Text
            style={{
              paddingVertical: 15,
              fontSize: 16,
              color: '#000000',
              fontWeight: '500',
            }}>
            Đã tìm gần đây
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default React.memo(SearchRecent);
