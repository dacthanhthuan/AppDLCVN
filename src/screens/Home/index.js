import React, { useEffect, createContext, useState, useCallback } from 'react';
import styles from './styles';
import { SafeAreaView, StatusBar, Text, SectionList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
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
import { data1 } from './data';

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
import { WINDOW_WIDTH } from '../../global';
import { HEADER_EXPAND_HEIGHT, HEADER_COLLAPSE_HEIGHT } from './styles';

export const ScrollContext = createContext(false);

const Home = () => {
  //animate header
  const headerDiff = HEADER_EXPAND_HEIGHT - HEADER_COLLAPSE_HEIGHT;
  const scrollY = useSharedValue(0);
  const [isScroll, setIsScroll] = useState(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      if (event.contentOffset.y < WINDOW_WIDTH / 2)
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
        [0, headerDiff],
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

  //section list padding animate
  const paddingStyle = useAnimatedStyle(() => {
    const paddingTop = withSpring(
      interpolate(
        scrollY.value,
        [0, headerDiff],
        [HEADER_EXPAND_HEIGHT, 0],
        'clamp',
      ),
      {
        damping: 50,
        mass: 0.5,
      },
    );

    return {
      paddingTop,
    };
  }, []);

  //Hide SplashScreen
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  // Show/Hide statusbar
  useFocusEffect(
    useCallback(() => {
      StatusBar.setHidden(true);

      return () => {
        StatusBar.setHidden(false);
      };
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.headerExpand, collapsable]}>
        <Header />
      </Animated.View>

      <ScrollContext.Provider value={isScroll}>
        <AnimatedSectionList
          showsVerticalScrollIndicator={false}
          style={[styles.scrollview, paddingStyle]}
          sections={data1}
          renderSectionHeader={({ section }) =>
            section.title.length > 0 ? (
              <SectionHeader
                title={section.title}
                isMore={section.type.endsWith('/more')}
              />
            ) : null
          }
          renderItem={({ item, section }) => {
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
          scrollEventThrottle={16}
          removeClippedSubviews={true}
          windowSize={15}
          initialNumToRender={30}
        />
      </ScrollContext.Provider>
    </SafeAreaView>
  );
};
export default React.memo(Home);
