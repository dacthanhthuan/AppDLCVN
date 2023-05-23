import {View, Text, Pressable, StyleSheet} from 'react-native';
import {memo} from 'react';

const SectionHeader = ({title, isMore}) => {
  return (
    <View style={styles.categoryTitle}>
      <Text style={styles.textTitle}>{title}</Text>
      {isMore ? (
        <Pressable style={styles.textPressable}>
          <Text style={styles.textButton}>Xem tất cả</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default memo(SectionHeader);

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
  },

  textPressable: {
    right: '7%',
    position: 'absolute',
  },

  textButton: {
    color: '#005AA9',
    fontSize: 14,
  },
});
