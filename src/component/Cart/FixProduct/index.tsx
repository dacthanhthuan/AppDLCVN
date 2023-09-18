import {memo, useCallback, useRef, useState} from 'react';
import {Image, Pressable, Text, TouchableOpacity} from 'react-native';
import Animated, {
  SlideInDown,
  SlideOutDown,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import styles from './styles';
import {View} from 'react-native';
import Button from '../../Button';
import FixProductRowItem from './FixProductRowItem';
import CurrencyInput from 'react-native-currency-input';
import {formatPrice} from '../../../global';
import {useDispatch} from 'react-redux';
import {updateProductCart} from '../../../redux/actions/cartActions';

type FixProductProps = {
  visible: boolean;
  onCloseFilter?: () => void;
  item?: any;
};

export default memo(function ({visible, onCloseFilter, item}: FixProductProps) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState<any>(
    item.priceInCart > 0
      ? parseFloat(item.priceInCart)
      : parseFloat(item.product.price),
  );
  const [decrement, setDecrement] = useState<any>(
    parseFloat(item.decrementInCart) | 0,
  );

  const totalPrice = price * ((100 - decrement) / 100) * quantity;

  const lowestPrice =
    parseFloat(item.product.price) *
    ((100 - parseFloat(item.product.decrement)) / 100);

  // handle on apply filter
  const handleOnApplyFilter = useCallback(() => {
    const tempPrice =
      price == 0 || price == null ? parseFloat(item.product.price) : price;
    const tempDecrement = decrement == null ? 0 : decrement;

    const tempSell = tempPrice * ((100 - tempDecrement) / 100);

    if (tempSell < lowestPrice) {
      xValue.value = withSequence(
        withRepeat(
          withSequence(
            withTiming(5, {duration: 100}),
            withTiming(-5, {duration: 100}),
          ),
          2,
          true,
        ),
        withTiming(0, {duration: 100}),
      );

      colorValue.value = withTiming(1, {duration: 100});
    } else {
      dispatch(
        updateProductCart(
          {
            quantity: quantity,
            priceInCart: tempPrice,
            decrementInCart: tempDecrement,
          },
          item.product.product_id,
          item.pType,
        ),
      );

      handleOnCloseFilter();
    }
  }, [quantity, price, decrement]);

  // event handle: close filter:
  const handleOnCloseFilter = () => {
    if (typeof onCloseFilter == 'function') {
      onCloseFilter();
    }
  };

  // animate: price warning animation
  const xValue = useSharedValue(0);
  const colorValue = useSharedValue(0);

  const warningAnimated = useAnimatedStyle(() => {
    return {
      transform: [{translateX: xValue.value}],
    };
  }, []);

  const warningTextAnimated = useAnimatedStyle(() => {
    const color = interpolateColor(
      colorValue.value,
      [0, 1],
      ['#909090', '#fd1234'],
    );

    const fontWeight = colorValue.value == 1 ? 'bold' : '400';

    return {
      color,
      fontWeight,
    };
  }, []);

  return visible ? (
    <View style={styles.view}>
      <Pressable style={styles.outside} onPress={handleOnCloseFilter} />

      <Animated.View
        style={styles.contentView}
        entering={SlideInDown.duration(350)}
        exiting={SlideOutDown.duration(350)}>
        {/*  */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{item?.product?.product_name}</Text>
        </View>

        <TouchableOpacity
          style={styles.closeButton}
          hitSlop={10}
          onPress={handleOnCloseFilter}>
          <Image
            style={styles.closeImage}
            source={require('../../../assets/Rectangle328.png')}
          />
        </TouchableOpacity>

        <FixProductRowItem label={'Số lượng'}>
          <View style={styles.quantityChange}>
            <TouchableOpacity
              disabled={quantity == 0}
              hitSlop={10}
              onPress={() => setQuantity((q: number) => (q > 0 ? q - 1 : 0))}>
              <Text style={styles.quantityChangeText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantityChangeText}>{quantity}</Text>

            <TouchableOpacity
              hitSlop={10}
              onPress={() => setQuantity((q: number) => q + 1)}>
              <Text style={styles.quantityChangeText}>+</Text>
            </TouchableOpacity>
          </View>
        </FixProductRowItem>

        <FixProductRowItem label={'Giá bán'}>
          <CurrencyInput
            value={price}
            onChangeValue={setPrice}
            style={styles.input}
            suffix="đ"
            delimiter={'.'}
            precision={0}
            minValue={0}
            placeholder="đ"
          />
        </FixProductRowItem>

        <FixProductRowItem label={'Giảm giá'}>
          <CurrencyInput
            value={decrement}
            onChangeValue={setDecrement}
            style={styles.input}
            suffix="%"
            delimiter={'.'}
            precision={0}
            minValue={0}
            maxValue={100}
            placeholder="%"
          />
        </FixProductRowItem>

        <FixProductRowItem label={'Tổng giá bán'}>
          <Text style={styles.price}>{formatPrice(totalPrice)}</Text>
        </FixProductRowItem>

        <Animated.View style={[styles.warning, warningAnimated]}>
          <Image
            source={require('../../../assets/warning.png')}
            style={styles.warningImage}
          />
          <Animated.Text style={[styles.warningText, warningTextAnimated]}>
            Giá bán tối thiểu {formatPrice(lowestPrice)}
          </Animated.Text>
        </Animated.View>

        <Button
          text={'Áp dụng'}
          onPress={handleOnApplyFilter}
          style={undefined}
          styleText={styles.applyButton}
        />
      </Animated.View>
    </View>
  ) : null;
});
