import {View} from 'react-native';
import {AnimatedImgButton} from '../ImageButton';
import InputSearch from '../InputSearch';
import {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  HEADER_EXPAND_HEIGHT,
  HEADER_COLLAPSE_HEIGHT,
} from '../../../screens/Home/styles';
import {WINDOW_WIDTH} from '../../../global';
import CartBadge from '../../Cart/CartBadge';

const logo = require('../../../assets/Home/Rectangle2.png');
const cart = require('../../../assets/Home/Vector.png');
const searchSetting = require('../../../assets/Home/Rectangle313.png');
const search = require('../../../assets/Home/ei_search.png');

const Header = () => {
  const navigation = useNavigation();
  const headerHeight = useSharedValue(0);

  //navigate to cart
  const goToCart = () => {
    navigation.navigate('Cart');
  };

  //navigate to search
  const goToSearch = () => {
    navigation.navigate('SearchRecent');
  };

  //header animate
  const headerCollapseStyle = useAnimatedStyle(() => {
    const marginTop = withSpring(
      interpolate(
        headerHeight.value,
        [HEADER_COLLAPSE_HEIGHT, HEADER_EXPAND_HEIGHT],
        [HEADER_EXPAND_HEIGHT * 0.15, HEADER_EXPAND_HEIGHT * 0.2],
        'clamp',
      ),
      {
        damping: 5000,
        mass: 1,
        stiffness: 50,
      },
    );

    const marginBottom = withSpring(
      interpolate(
        headerHeight.value,
        [HEADER_COLLAPSE_HEIGHT, HEADER_EXPAND_HEIGHT],
        [50, 0],
        'clamp',
      ),
      {
        damping: 5000,
        mass: 1,
        stiffness: 50,
      },
    );

    return {
      marginTop,
      marginBottom,
    };
  }, []);

  //logo animate
  const logoAnimatedStyle = useAnimatedStyle(() => {
    const height = withTiming(
      interpolate(
        headerHeight.value,
        [HEADER_COLLAPSE_HEIGHT, HEADER_EXPAND_HEIGHT],
        [HEADER_EXPAND_HEIGHT * 0.3, HEADER_EXPAND_HEIGHT * 0.4],
        'clamp',
      ),
      {
        duration: 500,
        easing: Easing.out(Easing.exp),
      },
    );

    return {
      height,
    };
  });

  //cart animate
  const cartAnimatedStyle = useAnimatedStyle(() => {
    const top = withTiming(
      interpolate(
        headerHeight.value,
        [HEADER_COLLAPSE_HEIGHT, HEADER_EXPAND_HEIGHT],
        [-HEADER_COLLAPSE_HEIGHT * 0.2, HEADER_EXPAND_HEIGHT * 0.35 * 0.05],
        'clamp',
      ),
      {
        duration: 500,
        easing: Easing.out(Easing.exp),
      },
    );

    return {
      top,
    };
  });

  //icon search animate
  const iconSearchAnimatedStyle = useAnimatedStyle(() => {
    const left = withSpring(
      interpolate(
        headerHeight.value,
        [HEADER_COLLAPSE_HEIGHT, HEADER_EXPAND_HEIGHT / 2],
        [WINDOW_WIDTH * 0.02, -50],
        'clamp',
      ),
      {
        damping: 50,
        mass: 0.5,
        stiffness: 50,
      },
    );

    return {
      left,
    };
  });

  return (
    <View
      style={[styles.expandsStyle]}
      onLayout={({nativeEvent}) => {
        // headerHeight.value = nativeEvent.layout.height;
        if (
          nativeEvent.layout.height >
          HEADER_EXPAND_HEIGHT - HEADER_COLLAPSE_HEIGHT
        )
          headerHeight.value = 150;
        else headerHeight.value = 60;
      }}>
      <Animated.View style={[styles.logoAndCart, headerCollapseStyle]}>
        <Animated.Image
          source={logo}
          style={[styles.logo, logoAnimatedStyle]}
          resizeMode="contain"
        />

        <AnimatedImgButton
          containerStyle={[styles.cartPressable]}
          imageStyle={styles.cart}
          imagesource={cart}
          onPress={() => goToCart()}
          style={cartAnimatedStyle}
          children={<CartBadge style={styles.cartBadge} />}
        />

        <AnimatedImgButton
          containerStyle={styles.searchPressable}
          imageStyle={styles.search}
          imagesource={search}
          onPress={() => goToSearch()}
          style={iconSearchAnimatedStyle}
        />
      </Animated.View>

      <Animated.View style={styles.searchContainer}>
        <InputSearch style={styles.searchInput} />

        <AnimatedImgButton
          imagesource={searchSetting}
          containerStyle={styles.searchSettingCont}
          imageStyle={styles.searchSettingStyle}
        />
      </Animated.View>
    </View>
  );
};

export default memo(Header);
