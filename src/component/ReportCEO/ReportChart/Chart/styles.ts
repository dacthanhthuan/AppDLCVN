import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },

  chartYAxisText: {
    fontSize: 14,
    fontWeight: '500',
  },

  chartXAxisText: {
    fontSize: 13,
    fontWeight: '500',
  },

  tooltipView: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 5,
    marginBottom: 2,
    left: -4,
  },

  tooltipText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },

  detail: {
    width: 100,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    position: 'absolute',
    top: 5,
    left: 60,
    backgroundColor: '#fff',
    padding: 5,
  },

  detailDate: {
    fontSize: 13,
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
  },

  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },

  chartTitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },

  chartSmallTitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default styles;
