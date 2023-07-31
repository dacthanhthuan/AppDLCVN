import {View, Text, Pressable, StyleSheet} from 'react-native';
import {memo} from 'react';

const SectionHeader = ({title, isMore}) => {
  return (
    <View style={styles.categoryTitle}>
      <Text style={styles.textTitle}>{title}</Text>
      {isMore ? (
        <Pressable
          style={({pressed}) => [
            styles.textPressable,
            pressed ? {opacity: 0.5} : null,
          ]}>
          <Text style={styles.textButton}>Xem thêm</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default memo(
  SectionHeader,
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

const styles = StyleSheet.create({
  categoryTitle: {
    width: '100%',
    marginHorizontal: '3%',
    marginTop: '5%',
    marginBottom: '2%',
    flexDirection: 'row',
  },

  textTitle: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    maxWidth: '70%',
  },

  textPressable: {
    right: '7%',
    position: 'absolute',
  },

  textButton: {
    color: '#005AA9',
    fontSize: 14,
    fontWeight: '400',
  },
});
