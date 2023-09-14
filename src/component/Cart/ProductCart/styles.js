import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 6,
  },
  rightContainer: {
    marginLeft: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    //iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    // Android
    elevation: 4,
    width: '90%',
  },
  image: {
    width: 80,
    height: 80,
  },
  rightCard: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
    gap: 5,
  },
  title: {
    fontSize: 13,
    textTransform: 'uppercase',
    color: '#000000',
  },
  id: {
    fontSize: 13,
    color: '#C2C2C2',
    marginTop: 7,
  },
  price: {
    fontSize: 16,
    color: '#005AA9',
    marginTop: 7,
    fontWeight: '500',
  },
  rowPriceSL: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  rowSL: {
    flexDirection: 'row',
    backgroundColor: '#005AA9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    width: '50%',
  },
  buttonSL: {
    color: '#FFFFFF',
    paddingHorizontal: 10,
  },
  decrementBadge: {
    paddingHorizontal: 10,
    backgroundColor: '#BB2525',
    color: 'white',
    borderRadius: 5,
    textAlign: 'center',
    verticalAlign: 'middle',
    zIndex: 1,
    fontSize: 13,
    left: 5,
  },

  stroke_line: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },

  decrementPrice: {
    fontSize: 16,
    color: 'red',
    marginTop: 7,
    fontWeight: '500',
    maxWidth: 80,
    flexWrap: 'wrap',
  },

  fixButton: {
    left: 20,
    width: '25%',
    alignItems: 'center',
  },

  fixLabel: {
    fontWeight: '500',
    color: '#252B48',
  },
});

export default styles;
