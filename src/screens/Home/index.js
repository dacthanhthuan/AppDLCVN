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
import {WINDOW_HEIGHT} from '../../global';
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

export const ScrollContext = createContext(false);

const Home = () => {
  const dispatch = useDispatch();
  const loadingApp = useSelector(state => state.app.loading); // loading domain and api state
  const isLogin = useSelector(state => state.user?.login.status); // login state
  const session_token = useSelector(state => state.user?.session_token); // session_token of user
  const mProduct = useSelector(state => state.product); // loading product data
  const totalPage = useSelector(state => state.product.data[0]?.data.perpage);
  const [sections, setSections] = useState([]);
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

  // Initial rendered of app
  useEffect(() => {
    // get user data from local and dispatch to redux
    getUserDatafromLocal();
    // start call api to get new domain and apikey
    dispatch(clientInitialApiStart);
    // hide splash screen and set color for status bar
    SplashScreen.hide();
    StatusBar.setBackgroundColor('#005AA9');
  }, []);

  // get product list from server
  const getProductListApi = (page = 1) => {
    try {
      dispatch(clientProductListStart(page, 0, session_token));
    } catch (error) {
      throw new Error(error);
    }
  };

  // after loading app state (domain and api) finish or user is logout/login then
  // clear product list data and call api to get data from server
  useEffect(() => {
    if (!loadingApp) {
      dispatch(clientProductListClear);
      getProductListApi();
    }
  }, [loadingApp, isLogin]);

  // set data for section list after get data from api
  // and set refreshing state is false after get data
  useEffect(() => {
    setSections([mProduct]);
    if (!mProduct.loading) {
      setRefreshing(false);
      setLoadmore(false);
    }
  }, [mProduct]);

  // refreshing feature
  useEffect(() => {
    if (refreshing) {
      dispatch(clientProductListClear);
      getProductListApi();
    }
  }, [refreshing]);

  // loadmore feature
  const onLoadmore = () => {
    if (!mProduct.loading) {
      getProductListApi(mProduct.data.length + 1);
    }
  };

  // skeleton visible handler
  useEffect(() => {
    if ((mProduct.loading || loadingApp) && !loadmore) {
      setSekeletonVisible(true);
    } else setSekeletonVisible(false);
  }, [loadingApp, mProduct]);

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
            renderItem={({item}) => <HomeSectionRenderItem item={item} />}
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
            //         case section.type.includes('/half'):
            //           return <SlideHalf item={item} />;
            //         case section.type.includes('/carousel'):
            //           return <CarouselSlide data={item} />;
            //         default:
            //           return (
            //             <SlideLargest
            //               slide={item.source}
            //               backgroundColor={item.backgroundColor}
            //             />
            //           );
            //       }
            //     case section.type.startsWith('category'): {
            //       return <CategoryItem item={item} />;
            //     }
            //     case section.type.startsWith('tropy'): {
            //       return <TrophyOf3 item={item} />;
            //     }
            //     case section.type.startsWith('product'): {
            //       switch (true) {
            //         case section.type.includes('/carousel'):
            //           return <CarouselProduct data={item} />;
            //         case section.type.includes('/mutable'):
            //           return <MutableList item={item} checked={1} />;
            //         default:
            //           return <ListProduct data={item} />;
            //       }
            //     }
            //   }
            // }}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            removeClippedSubviews={true}
            initialNumToRender={20}
            overScrollMode={'never'}
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
              if (mProduct.data.length + 1 < totalPage) {
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
