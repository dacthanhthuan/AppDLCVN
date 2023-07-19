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

//Splash screen
import SplashScreen from 'react-native-splash-screen';

//Animation List
const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

//Data
import {data1, data2} from './data';

//Component
import SlideLargest from '../../component/Home/SlideLargest';
import SectionHeader from '../../component/Home/SectionHeader';
import CategoryItem from '../../component/Home/CategoryItem';
import TrophyOf3 from '../../component/Home/TrophyOf3';
import SlideHalf from '../../component/Home/SlideHalf';
import CarouselProduct from '../../component/Home/CarouselProduct';
import Header from '../../component/Home/HeaderTitle/HeaderTitle';
import ListProduct from '../../component/Home/ListProduct';
import MutableList from '../../component/Home/MutalbeListProduct/MutableList';
import CarouselSlide from '../../component/Home/CarouselSlide';
import {WINDOW_HEIGHT} from '../../global';
import {HEADER_EXPAND_HEIGHT, HEADER_COLLAPSE_HEIGHT} from './styles';
import {useDispatch} from 'react-redux';
import {clientRegisterStart} from '../../redux/actions/clientRegister';

export const ScrollContext = createContext(false);

const Home = () => {
  const dispatch = useDispatch();

  //animate header
  const scrollY = useSharedValue(0);
  const [isScroll, setIsScroll] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sections, setSections] = useState(data1);

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
    dispatch(clientInitialApiStart);
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  // StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('#005AA9');

  //refreshing
  useEffect(() => {
    if (refreshing) {
      if (JSON.stringify(sections) === JSON.stringify(data1))
        setSections(data2);
      else setSections(data1);
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.headerExpand, collapsable]}>
        <Header />
      </Animated.View>

      <ScrollContext.Provider value={isScroll}>
        <AnimatedSectionList
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}
          sections={sections}
          renderSectionHeader={({section}) =>
            section.title.length > 0 ? (
              <SectionHeader
                title={section.title}
                isMore={section.type.endsWith('/more')}
              />
            ) : null
          }
          renderItem={({item, section}) => {
            switch (true) {
              case section.type.startsWith('slide'):
                switch (true) {
                  case section.type.includes('/half'):
                    return <SlideHalf item={item} />;
                  case section.type.includes('/carousel'):
                    return <CarouselSlide data={item} />;
                  default:
                    return (
                      <SlideLargest
                        slide={item.source}
                        backgroundColor={item.backgroundColor}
                      />
                    );
                }
              case section.type.startsWith('category'): {
                return <CategoryItem item={item} />;
              }
              case section.type.startsWith('tropy'): {
                return <TrophyOf3 item={item} />;
              }
              case section.type.startsWith('product'): {
                switch (true) {
                  case section.type.includes('/carousel'):
                    return <CarouselProduct data={item} />;
                  case section.type.includes('/mutable'):
                    return <MutableList item={item} checked={1} />;
                  default:
                    return <ListProduct data={item} />;
                }
              }
            }
          }}
          onScroll={scrollHandler}
          scrollEventThrottle={12}
          removeClippedSubviews={true}
          initialNumToRender={30}
          overScrollMode={'never'}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={['white']}
              progressBackgroundColor={'#005AA9'}
              onRefresh={() => setRefreshing(true)}
            />
          }
          windowSize={21}
        />
      </ScrollContext.Provider>
    </SafeAreaView>
  );
};
export default React.memo(Home);
