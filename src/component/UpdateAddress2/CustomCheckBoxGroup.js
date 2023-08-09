import RadioButton from '../RadioButton';
import Checkbox from '../Checkbox';
import {StyleSheet} from 'react-native';
import {useCallback, useEffect, memo} from 'react';
import {
  AddressCheckBoxActions,
  useAddressCheckBox,
  useAddressCheckBoxDispatch,
} from './AddressCheckBox/context';
import CustomRadioButton from './CustomRadioButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  locationListDistrictEnd,
  locationListDistrictStart,
  locationListWardEnd,
  locationListWardStart,
} from '../../redux/actions/locationActions';

const CheckBoxGroup = () => {
  const addressCheckbox = useAddressCheckBox();
  const addressDispatch = useAddressCheckBoxDispatch();
  const session_token = useSelector(state => state.user.session_token);
  const dispatch = useDispatch();

  const onCheckboxSelect = useCallback(
    select => {
      addressDispatch(AddressCheckBoxActions.selectButton(select?.subdivision));

      switch (select.subdivision) {
        // district
        case 'district': {
          if (addressCheckbox.city.id) {
            dispatch(
              locationListDistrictStart(session_token, addressCheckbox.city.id),
            );
          } else {
            dispatch(locationListDistrictEnd([]));
          }
          break;
        }

        // ward
        case 'ward': {
          if (addressCheckbox.district.id) {
            dispatch(
              locationListWardStart(session_token, addressCheckbox.district.id),
            );
          } else {
            dispatch(locationListWardEnd([]));
          }
          break;
        }
      }
    },
    [addressCheckbox.city, addressCheckbox.district],
  );

  return (
    <CustomRadioButton
      containerStyle={styles.container}
      data={[
        addressCheckbox.city,
        addressCheckbox.district,
        addressCheckbox.ward,
      ]}
      renderButton={({item, isSelected}) => {
        return (
          <Checkbox
            inactiveStyle={styles.checkbox}
            containerStyle={styles.checkboxview}
            text={item.name}
            check={isSelected}
            disable={true}
          />
        );
      }}
      buttonStyle={styles.buttonContainer}
      activeContButtonStyle={styles.activeButton}
      onSelect={onCheckboxSelect}
    />
  );
};

export default memo(CheckBoxGroup);

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    height: 200,
  },

  checkbox: {
    borderColor: 'transparent',
    width: 22,
    height: 22,
    transform: [{scale: 0.5}],
    backgroundColor: '#005AA9',
    alignSelf: 'center',
  },

  checkboxview: {
    marginVertical: 5,
    paddingLeft: 15,
  },

  activeButton: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#005AA9',
  },
});
