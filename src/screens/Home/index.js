import React, { useEffect, createContext, useState } from 'react';
import styles from './styles';
import {
  SafeAreaView,
  StatusBar,
  RefreshControl,
  SectionList,
  View,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  interpolate,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

//Splash screen
import SplashScreen from 'react-native-splash-screen';

//Animation List
const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

//Data
import { data1, data2 } from './data';

//Component
import SectionHeader from '../../component/Home/SectionHeader';
import Header from '../../component/Home/HeaderTitle/HeaderTitle';
import ListProduct from '../../component/Home/ListProductPotrait';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../global';
import { HEADER_EXPAND_HEIGHT, HEADER_COLLAPSE_HEIGHT } from './styles';
import store from '../../redux/store';
import { clearproductHome, loadCartFromLocalStorage, loadCartFromLocalStoragePoint, productHome } from '../../redux/actions';
import { useSelector } from 'react-redux';
import CategoryLandscapeSmall from '../../component/Home/CategoryLandscapeSmall';
import CarouselSlideBig from '../../component/Home/CarouselSlideBig';
import CarouselSlideSmall from '../../component/Home/CarouselSlideSmall';
import SlideLargestBig from '../../component/Home/SlideLargestBig';
import SlideLargestSmall from '../../component/Home/SlideLargestSmall';
import ButtonProductMore from '../../component/ButtonProductMore';
import CategoryLandscapeBig from '../../component/Home/CategoryLandscapeBig';
import CategoryPotrait from '../../component/Home/CategoryPotrait';
import ListProductPotrait from '../../component/Home/ListProductPotrait';
import ListProductLandscape from '../../component/Home/ListProductLandscape';
import { FETCH_USERS_SUCCESS } from '../../redux/actionTypes';
import { SAVE_DATA, SAVE_ISLOGGEDIN, SAVE_PRODUCT_CART, SAVE_PRODUCT_CART_POINT, getItem, getProductCartLocal } from '../../Local/AsyncStorage';
import BannerSmall from '../../component/BannerSmall';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { firstCallAPI } from '../../http';
import { Image } from 'react-native';


export const ScrollContext = createContext(false);

const Home = () => {

  const { cartItems } = useSelector((state) => state.postReducers)

  //animate header
  const scrollY = useSharedValue(0);
  const [isScroll, setIsScroll] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingSkeleton, setIsLoadingSkeleton] = useState(false);

  let initialNum = 30;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      if (event.contentOffset.y < WINDOW_HEIGHT / 2)
        scrollY.value = event.contentOffset.y;
    },
    onMomentumBegin: () => {
      !isScroll ? runOnJS(setIsScroll)(true) : null;
    },
    onMomentumEnd: () => {
      isScroll ? runOnJS(setIsScroll)(false) : null;
    },
    onBeginDrag: () => {
      !isScroll ? runOnJS(setIsScroll)(true) : null;
    },
    onEndDrag: () => {
      isScroll ? runOnJS(setIsScroll)(false) : null;
    },
  });

  //header height animate
  const collapsable = useAnimatedStyle(() => {
    const height = withSpring(
      interpolate(
        scrollY.value,
        [0, HEADER_EXPAND_HEIGHT],
        [HEADER_EXPAND_HEIGHT, HEADER_COLLAPSE_HEIGHT],
        'clamp',
      ),
      {
        damping: 50,
        mass: 0.5,
      },
    );

    return {
      height,
    };
  }, []);

  //Hide SplashScreen
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  // StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('#005AA9');

  //Optimize
  useEffect(() => {
    return () => {
      initialNum = 15;
    };
  }, []);


  const { home, data, isLoggedIn, nextPage } = useSelector((state) => state.postReducers)

  // Khi vào app sẽ tiến hành call API truyền vào appName để lấy domain và APIKey
  useEffect(() => {
    firstCallAPI({
      "appName": "khttest",
    })
  }, [data])

  useEffect(() => {
    const fetchIsLogged = async () => {
      const getIsLoggedIn = await getItem(SAVE_ISLOGGEDIN);
      // Nạp hồ sơ khi getIsLoggedIn === true
      if (getIsLoggedIn === 'true') {
        const profileData = await getItem(SAVE_DATA);
        if (profileData) {
          store.dispatch({ type: FETCH_USERS_SUCCESS, payload: JSON.parse(profileData) });
        }
      };
    }
    fetchIsLogged();
  }, []);

  // useEffect(() => {
  //   setIsLoadingSkeleton(true)
  // }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const session_token = data?.data?.session_token;
      store.dispatch(productHome(1, session_token, "0"));
    } else {
      store.dispatch(productHome(1, '', "0"));
    }
  }, [isLoggedIn, refreshing])

  const modifyData = (item) => {
    // console.log(item);
    const modify = []

    item?.forEach((response) => {
      // console.log('es::', response);
      const theme = response?.data?.theme || [];
      const productList = response?.data?.l || [];
      const popup = response?.data?.popup || null;
      const page = response?.data?.page || null;


      if (page == 1) {
        theme?.forEach(item => {
          const themeLayout = item?.layout || null;
          const slide = {
            type: '',
            title: '',
            data: []
          }
          const category1 = {
            type: '',
            title: '',
            data: []
          }
          const category2 = {
            type: '',
            title: '',
            data: []
          }
          const product1 = {
            type: '',
            title: '',
            data: []
          }
          const product2 = {
            type: '',
            title: '',
            data: []
          }


          // Check data
          if (item?.slide_list.length > 0) {
            slide.type = '/slide';
            slide.data = item?.slide_list;
          }
          if (item?.category_1_list.length > 0) {
            category1.type = '/category';
            category1.data = [item?.category_1_list];
          }
          if (item?.category_2_list.length > 0) {
            category2.type = '/category';
            category2.data = [item?.category_2_list];
          }
          if (item?.product_1_list.length > 0) {
            product1.type = '/product';
            product1.data = [item?.product_1_list];
          }
          if (item?.product_2_list.length > 0) {
            product2.type = '/product',
              product2.data = [item?.product_2_list];
          }

          //Check title
          if (item?.name_show == 1) {
            if (slide.data.length > 0) {
              slide.title = item?.name
            }
            if (product1.data.length > 0) {
              product1.title = item?.name
            }
            if (category1.data.length > 0) {
              category1.title = item?.name
            }
          }

          //Check slide
          if (item?.slide_list.length > 1) {
            slide.type += '/carousel';
            slide.data = [slide.data]
          }
          if (themeLayout?.slide_size === 'big') {
            slide.type += '/big';
          }
          else {
            slide.type += '/small';
          }

          // Check cate theme
          if (themeLayout?.cate === 'landscape') {
            category1.type += '/landscape';
            category2.type += '/landscape';
            if (themeLayout?.slide_cate === 'small') {
              category1.type += '/small';
              category2.type += '/small';
            } else {
              category1.type += '/big';
              category2.type += '/big';
            }
          } else {
            category1.type += '/portrait';
            category2.type += '/portrait';
          }

          // Check Product
          if (themeLayout?.product === 'portrait') {
            product1.type += '/portrait'
            product2.type += '/portrait'
          } else {
            product1.type = '/landscape'
            product2.type = '/landscape'
          }

          if (slide.data.length > 0) {
            modify.push(slide)
          }
          if (category1.data.length > 0) {
            modify.push(category1)
          }
          if (category2.data.length > 0) {
            modify.push(category2)
          }
          if (product1.data.length > 0) {
            modify.push(product1)
          }
          if (product2.data.length > 0) {
            modify.push(product2)
          }

          // Check Product Show More
          if (item?.product_show_more == '1' && item?.product_1_list.length > 0) {
            product1.type += '/more'
            product2.type += '/more'
          }

          // Check category show more
          if (item?.category_show_more == '1') {
            product1.type += '/showmore'
            product2.type += '/showmore'
          }

        });
      }

      //Check Productlisst
      if (productList.length > 0) {
        if (page > 1) {
          modify.push({
            type: '/product/portrait',
            title: '',
            data: [productList]
          })
        } else if (page == 1) {
          modify.push({
            type: '/product/portrait',
            title: 'GỢI Ý HÔM NAY',
            data: [productList]
          })
        }
      }

    });

    // console.log(modify);
    return modify;
  }

  useEffect(() => {
    if (home?.length > 0) {
      setSections(modifyData(home))
      setIsLoadingSkeleton(false)
    }
    setRefreshing(false);
    setIsLoading(false)

  }, [home, nextPage]);

  // Load more Page
  const handleLoadMore = () => {
    const totalRecord = home[0]?.data?.total_record; // 22
    let currentRecord = 0;

    // Lấy ra Length của l.
    home?.forEach(item => {
      const itemDataL = item?.data?.l;
      // Kiểm tra có itemDataL và itemDataL có phải là 1 mảng  
      if (itemDataL && Array.isArray(itemDataL)) {
        currentRecord += itemDataL.length;
      }
    });

    // Nếu listProduct của pageCurrent nhỏ hơn totalRecord sẽ gọi API tăng page lên 
    if (currentRecord < totalRecord) {
      setIsLoading(true)
      const session_token = isLoggedIn ? data?.data?.session_token : '';
      store.dispatch(productHome(nextPage, session_token, '0'));
    } else {
      setIsLoading(false)
    }

  }

  // Refresh
  const onRefreshs = () => {
    setRefreshing(true);
    setIsLoadingSkeleton(true)
    store.dispatch(clearproductHome())
  }

  // Lấy Dữ liệu ở local danh sách sản phẩm trong giỏ hàng
  const fetchData = async () => {
    const storedCartItems = await getProductCartLocal(SAVE_PRODUCT_CART); // Giỏ hàng
    const storedCartItemsPoint = await getProductCartLocal(SAVE_PRODUCT_CART_POINT); // Giỏ hàng điểm
    if (storedCartItems !== null) {
      store.dispatch(loadCartFromLocalStorage(storedCartItems));
      store.dispatch(loadCartFromLocalStoragePoint(storedCartItemsPoint));
    }
  };


  // Gửi dữ liệu lên REDUX
  useEffect(() => {
    fetchData();
  }, []);

  // Tính tổng số lượng
  let totalIsQuantity = cartItems ? cartItems.reduce((total, item) => {
    return total + item?.quantity;
  }, 0) : 1;

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
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.headerExpand, collapsable]}>
        <Header totalIsQuantity={totalIsQuantity} />
      </Animated.View>

      <ScrollContext.Provider value={isScroll}>
        <AnimatedSectionList
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}
          sections={sections}
          renderSectionHeader={({ section }) =>
            section.title.length > 0 ? (
              loadingSkeleton ?
                <SkeletonPlaceholder>
                  <View style={{ paddingHorizontal: 16, marginTop: 16, }}>
                    <View style={{ width: 100, height: 26, borderRadius: 8 }} />
                  </View>
                </SkeletonPlaceholder>
                :
                (
                  <SectionHeader
                    title={section.title}
                    isMore={section.type.includes('/showmore')}
                  />
                )
            ) : null
          }
          renderItem={({ item, section }) => {
            switch (true) {
              case section.type.startsWith('/slide'):
                switch (true) {
                  case section.type.includes('/carousel'): //complete
                    switch (true) {
                      case section.type.includes('/big'):  //complete
                        return (
                          loadingSkeleton ? (
                            <SkeletonPlaceholder >
                              <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 16 }}>
                                <View style={{ width: WINDOW_WIDTH - 32, height: WINDOW_HEIGHT * 0.35, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }} />
                              </View>
                            </SkeletonPlaceholder>
                          ) : (
                            <CarouselSlideBig data={item} />
                          )
                        );
                      case section.type.includes('/small'):  //complete
                        return (
                          loadingSkeleton ? (
                            <SkeletonPlaceholder>
                              <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 16 }}>
                                <View style={{ width: WINDOW_WIDTH - 16, height: WINDOW_HEIGHT * 0.20, borderRadius: 8 }} />
                              </View>
                            </SkeletonPlaceholder>
                          ) : (<CarouselSlideSmall data={item} />))
                    }
                  case section.type.includes('/big'):
                    return <SlideLargestBig data={item} />;
                  case section.type.includes('/small'):
                    return (
                      loadingSkeleton ? (
                        <SkeletonPlaceholder>
                          <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 16 }}>
                            <View style={{ width: WINDOW_WIDTH - 16, height: WINDOW_HEIGHT * 0.20, borderRadius: 8 }} />
                          </View>
                        </SkeletonPlaceholder>
                      ) : (<BannerSmall item={item} />))
                }
              case section.type.startsWith('/category'):
                switch (true) {
                  case section.type.includes('/landscape'):
                    switch (true) {
                      case section.type.includes('/big'): //complete
                        return <CategoryLandscapeBig item={item} />;
                      case section.type.includes('/small'):
                        return loadingSkeleton ? (
                          <SkeletonPlaceholder>
                            <View style={{ marginHorizontal: 16, flexDirection: 'row' }}>
                              <View style={{ width: 100, height: 50, marginRight: 12, borderRadius: 8 }} />
                              <View style={{ width: 100, height: 50, marginRight: 12, borderRadius: 8 }} />
                              <View style={{ width: 100, height: 50, marginRight: 12, borderRadius: 8 }} />
                              <View style={{ width: 100, height: 50, marginRight: 12, borderRadius: 8 }} />
                            </View>
                          </SkeletonPlaceholder>
                        ) : (
                          <CategoryLandscapeSmall data={item} />
                        );
                    }
                  case section.type.includes('/portrait'): //complete
                    return <CategoryPotrait data={item} />;
                }
              case section.type.startsWith('/product'): {
                switch (true) {
                  case section.type.includes('/portrait'): //complete
                    return loadingSkeleton ?
                      (
                        <SkeletonPlaceholder>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 16 }}>
                            <View style={{ width: '49%', height: WINDOW_HEIGHT * 0.25, borderRadius: 8 }} />
                            <View style={{ width: '49%', height: WINDOW_HEIGHT * 0.25, borderRadius: 8 }} />
                          </View>
                        </SkeletonPlaceholder>
                      )
                      : (
                        <ListProductPotrait isMore={section.type.includes('/more')} data={item} />
                      )
                  case section.type.includes('/landscape'): //complete
                    return <ListProductLandscape isMore={section.type.includes('/more')} data={item} />;
                }
              }
            }
          }}
          onScroll={scrollHandler}
          scrollEventThrottle={12}
          removeClippedSubviews={true}
          initialNumToRender={initialNum}
          overScrollMode={'never'}
          refreshControl={
            < RefreshControl
              refreshing={refreshing}
              colors={['white']}
              progressBackgroundColor={'#005AA9'}
              onRefresh={onRefreshs}
            />
          }
          windowSize={21}
          onEndReached={handleLoadMore}
          ListFooterComponent={renderFooter}
        />
      </ScrollContext.Provider>
    </SafeAreaView >
  );
};

export default React.memo(Home);