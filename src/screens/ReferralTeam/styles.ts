import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: 15,
  },

  header: {
    padding: 15,
  },

  searchView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  search: {
    width: '80%',
  },

  searchSettingPressable: {
    width: 45,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  searchSettingImage: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
});

export default styles;
