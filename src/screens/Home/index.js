import React, {useEffect, createContext, useState} from 'react';
import styles from './styles';
import {
  SafeAreaView,
  StatusBar,
  RefreshControl,
  SectionList,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  interpolate,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {clientInitialApiStart} from '../../redux/actions/appActions';
import {clientLoginEnd} from '../../redux/actions/userActions';

//Splash screen
import SplashScreen from 'react-native-splash-screen';

//Animation List
const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

//Data
import {data1, data2, product, product2} from './data';

//Component
import CarouselSlideBig from '../../component/Home/CarouselSlideBig';
import SlideBig from '../../component/Home/SlideBig';
import CategoryLandscapeSmall from '../../component/Home/CategoryLandscapeSmall';
import Popup from '../../component/Home/Popup';
import SlideSmall from '../../component/Home/SlideSmall';
import SectionHeader from '../../component/Home/SectionHeader';
import CategoryLandscapeBig from '../../component/Home/CategoryLandscapeBig';
import TrophyOf3 from '../../component/Home/TrophyOf3';
import CategoryPortrait from '../../component/Home/CategoryPortrait';
import CarouselProduct from '../../component/Home/CarouselProduct';
import Header from '../../component/Home/HeaderTitle/HeaderTitle';
import ListProduct from '../../component/Home/ListProduct';
import MutableList from '../../component/Home/MutalbeListProduct/MutableList';
import CarouselSlideSmall from '../../component/Home/CarouselSlideSmall';
import {WINDOW_HEIGHT, modifyData} from '../../MyGlobal';
import {HEADER_EXPAND_HEIGHT, HEADER_COLLAPSE_HEIGHT} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  clientProductListClear,
  clientProductListStart,
} from '../../redux/actions/productListActions';
import {LOCALSTORAGE} from '../../storage/direct';
import {getData} from '../../storage';
import HomeSectionRenderItem from '../../component/Home/HomeSectionRenderItem';
import HomeSkeleton from '../../component/Home/HomeSkeleton';
import LoadmoreIndicator from '../../component/Home/LoadmoreIndicator';
import {PRODUCT_LIST} from '../../redux/actions/types';
import ThemeListHeaderComponent from '../../component/Home/ThemeListHeaderComponent';
import {mergeProductData} from '../../redux/actions/cartActions';
import {mergeSearch} from '../../redux/actions/searchRecentActions';

export const ScrollContext = createContext(false);

const Home = () => {
  const dispatch = useDispatch();
  const loadingApp = useSelector(state => state.app.loading); // loading domain and api state
  const isLogin = useSelector(state => state.user?.login.status); // login state
  const session_token = useSelector(state => state.user?.session_token); // session_token of user
  const productData = useSelector(state => state.product); // product list data
  const totalRecord = useSelector(state => state.product.total_record); // total record
  const currentRecord = useSelector(state => state.product.current_record); //current record
  const nextpage = useSelector(state => state.product.nextpage); //current record

  const [sections, setSections] = useState([]); // section for
  const [refreshing, setRefreshing] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [skeletonVisible, setSekeletonVisible] = useState(true);

  // get user data from local and dispatch to redux
  const getUserDatafromLocal = async () => {
    await getData(LOCALSTORAGE.user)
      .then(res => {
        if (res !== null) {
          dispatch(clientLoginEnd(res));
        }
      })
      .catch(err => {});
  };

  // get cart data from local and dispatch to redux
  const getCartDataFromLocal = async () => {
    await getData(LOCALSTORAGE.cart)
      .then(res => {
        if (res != null) dispatch(mergeProductData(res.data));
      })
      .catch(err => {});
  };

  // get search recent data from local and dispatch redux
  const getSearchDataFromLocal = async () => {
    try {
      const sData = await getData(LOCALSTORAGE.search_recent);
      dispatch(mergeSearch(sData.data));
    } catch (error) {}
  };

  // Initial rendered of app
  useEffect(() => {
    // get data from local and dispatch to redux
    getUserDatafromLocal();
    getCartDataFromLocal();
    getSearchDataFromLocal();

    // start call api to get new domain and apikey
    dispatch(clientInitialApiStart);
    // hide splash screen and set color for status bar
    SplashScreen.hide();
    StatusBar.setBackgroundColor('#005AA9');
  }, []);

  // get product list from server
  const getProductListApi = (page = 1) => {
    try {
      dispatch(clientProductListStart(page, '0', session_token));
    } catch (error) {
      throw new Error(error);
    }
  };

  // after loading app state (domain and api) finish or user is logout/login then
  // clear product list data and call api to get data from server
  useEffect(() => {
    if (!loadingApp) {
      dispatch(clientProductListClear(PRODUCT_LIST.CLEAR));
      getProductListApi();
    }
  }, [loadingApp, isLogin]);

  // set data for section list after get data from api
  // and set refreshing state is false after get data
  useEffect(() => {
    // const data = modifyData(mProduct.data);
    setSections([productData]);
    if (!productData.loading) {
      setRefreshing(false);
      setLoadmore(false);
    }
  }, [productData]);

  // refreshing feature
  useEffect(() => {
    if (refreshing) {
      dispatch(clientProductListClear(PRODUCT_LIST.CLEAR));
      getProductListApi();
      setLoadmore(false);
    }
  }, [refreshing]);

  // loadmore feature
  const onLoadmore = () => {
    if (!productData.loading) {
      getProductListApi(nextpage);
    }
  };

  // check loadmore data
  const checkListRecord = () => {
    return currentRecord < totalRecord;
  };

  // skeleton visible handler
  useEffect(() => {
    if ((productData.loading || loadingApp) && !loadmore) {
      setSekeletonVisible(true);
    } else setSekeletonVisible(false);
  }, [loadingApp, productData]);

  // ANIMATION-----------------------------------
  // animate header
  const scrollY = useSharedValue(0);
  const [isScroll, setIsScroll] = useState(false);
  // console.log(sections);

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

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.headerExpand, collapsable]}>
        <Header />
      </Animated.View>

      {skeletonVisible ? (
        <HomeSkeleton />
      ) : (
        <ScrollContext.Provider value={isScroll}>
          <AnimatedSectionList
            showsVerticalScrollIndicator={false}
            style={styles.scrollview}
            sections={sections}
            renderSectionHeader={({section}) => (
              <ThemeListHeaderComponent data={section.theme} />
            )}
            renderItem={({item}) => {
              return <ListProduct data={item} />;
            }}
            renderSectionFooter={({section}) =>
              section.popup?.length > 0 ? (
                <Popup popupData={section.popup} />
              ) : null
            }
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            removeClippedSubviews={true}
            initialNumToRender={20}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={['white']}
                progressBackgroundColor={'#005AA9'}
                onRefresh={() => setRefreshing(true)}
              />
            }
            windowSize={31}
            onEndReached={() => {
              if (checkListRecord()) {
                setLoadmore(true);
                onLoadmore();
              }
            }}
          />
        </ScrollContext.Provider>
      )}
      {loadmore ? <LoadmoreIndicator /> : null}
    </SafeAreaView>
  );
};
export default React.memo(Home);

// ----------- Using modify data

// renderSectionHeader={({section}) =>
//   section.title.length > 0 ? (
//     <SectionHeader
//       title={section.title}
//       isMore={section.type.endsWith('/more')}
//     />
//   ) : null
// }
// renderItem={({item, section}) => {
//   switch (true) {
//     case section.type.startsWith('slide'):
//       switch (true) {
//         case section.type.includes('/carousel'):
//           switch (true) {
//             case section.type.includes('/small'):
//               return <CarouselSlideSmall data={item} />;
//             case section.type.includes('/big'):
//               return <CarouselSlideBig data={item} />;
//           }
//         case section.type.includes('/small'):
//           return <SlideSmall slide={{uri: item.banner}} />;
//         case section.type.includes('/big'):
//           return <SlideBig slide={{uri: item.banner}} />;
//       }
//     case section.type.startsWith('category'): {
//       switch (true) {
//         case section.type.includes('/portrait'):
//           return (
//             <CategoryPortrait
//               item={item}
//               isShowmore={section.type.includes('/showmore')}
//             />
//           );
//         case section.type.includes('/landscape'):
//           if (section.type.includes('/small'))
//             return (
//               <CategoryLandscapeSmall
//                 item={item}
//                 isShowmore={section.type.includes('/showmore')}
//               />
//             );
//           else
//             return (
//               <CategoryLandscapeBig
//                 item={item}
//                 isShowmore={section.type.includes('/showmore')}
//               />
//             );
//       }
//     }
//     case section.type.startsWith('product'): {
//       switch (true) {
//         case section.type.includes('/portrait'):
//           return (
//             <ListProduct
//               data={item}
//               isShowmore={section.type.includes('/showmore')}
//             />
//           );
//         case section.type.includes('/landscape'):
//           return (
//             <CarouselProduct
//               item={item}
//               checked={1}
//               isShowmore={section.type.includes('/showmore')}
//             />
//           );
//       }
//     }
//     case section.type.startsWith('popup'):
//       return <Popup popupData={item} />;
//   }
// }}
