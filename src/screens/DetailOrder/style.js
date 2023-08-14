import {StyleSheet} from 'react-native';

const Style_DetailOrder = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  container_1: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  text_1: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
  },
  icon_1: {
    width: 25,
    height: 25,
  },
  view_1: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  text_2: {
    fontSize: 16,
    color: '#000000',
    maxWidth: '90%',
  },
  text_3: {
    fontSize: 14,
    color: '#005AA9',
  },
  text_4: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '300',
  },
  title_1: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
  },
  view_2: {
    marginLeft: 10,
    height: 75,
    justifyContent: 'space-between',
    marginTop: 15,
  },
  text_5: {
    fontSize: 13,
    color: '#000000',
  },
  flatlist: {
    flexDirection: 'row',
    marginTop: 20,
  },
  view_3: {
    marginLeft: 10,
    flex: 3,
  },

  decrementBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    fontSize: 12,
    color: 'white',
    backgroundColor: 'red',
    position: 'absolute',
    left: -10,
    top: -10,
    zIndex: 1,
    textAlign: 'center',
    verticalAlign: 'middle',
  },

  stroke_line: {
    textDecorationLine: 'line-through',
    fontSize: 12,
  },

  decrementPrice: {
    fontSize: 14,
    color: 'red',
    marginRight: 5,
  },

  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    width: '40%',
    margin: 10,
    alignSelf: 'center',
  },
});

export default Style_DetailOrder;
