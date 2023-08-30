import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { memo } from 'react';

const SectionHeader = ({ title, isMore }) => {
  return (
    <View style={styles.categoryTitle}>
      <Text style={styles.textTitle}>{title}</Text>
      {isMore ? (
        <Pressable
          style={({ pressed }) => [
            styles.textPressable,
            pressed ? { opacity: 0.5 } : null,
          ]}>
          <Text style={styles.textButton}>Xem tất cả</Text>
          <Image style={styles.icon} resizeMode='contain' source={require('../../assets/vectorRight.png')} />
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
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  textTitle: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },

  textPressable: {
    right: '7%',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center'
  },

  textButton: {
    color: '#005AA9',
    fontSize: 14,
    marginRight: 4

  },
  icon: {
    width: 16,
    height: 16
  }
});
