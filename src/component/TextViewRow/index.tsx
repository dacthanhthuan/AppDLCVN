import {View, Text, StyleProp, TextStyle} from 'react-native';
import styles from './styles';

type TextViewRowProps = {
  title?: string;
  price?: string;
  point?: string;
  between?: string;
  titleStyle: StyleProp<TextStyle>;
  priceStyle: StyleProp<TextStyle>;
  pointStyle: StyleProp<TextStyle>;
  betweenStyle: StyleProp<TextStyle>;
};

export default function TextViewRow({
  title,
  price,
  point,
  between,
  titleStyle,
  priceStyle,
  pointStyle,
  betweenStyle,
}: TextViewRowProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <View style={styles.priceView}>
        {price ? <Text style={[styles.price, priceStyle]}>{price}</Text> : null}
        {between ? (
          <Text style={[styles.between, betweenStyle]}>{between}</Text>
        ) : null}
        {point ? <Text style={[styles.point, pointStyle]}>{point}</Text> : null}
      </View>
    </View>
  );
}
