import React, { useState } from 'react';
import { SafeAreaView, Text, Image } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Style_Dropdown from './style';

const Dropdown = ({ defaultButtonText, buttonTextStyle, buttonStyle, dropdownStyle, rowTextStyle, style_img }) => {
    const [selectedItem, setSelectedItem] = useState('');
    const week = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5',
        'Tuần 6', 'Tuần 7', 'Tuần 8', 'Tuần 9', 'Tuần 10',
        'Tuần 11', 'Tuần 12', 'Tuần 13', 'Tuần 14', 'Tuần 15',
        'Tuần 16', 'Tuần 17', 'Tuần 18', 'Tuần 19', 'Tuần 20',
        'Tuần 21', 'Tuần 22', 'Tuần 23', 'Tuần 24', 'Tuần 25',
        'Tuần 26', 'Tuần 27', 'Tuần 28', 'Tuần 29', 'Tuần 30',
        'Tuần 31', 'Tuần 32', 'Tuần 33', 'Tuần 34', 'Tuần 35',
        'Tuần 36', 'Tuần 37', 'Tuần 38', 'Tuần 39', 'Tuần 40',
        'Tuần 41', 'Tuần 42', 'Tuần 43', 'Tuần 44', 'Tuần 45',
        'Tuần 46', 'Tuần 47', 'Tuần 48', 'Tuần 49', 'Tuần 50',
    ];

    const handleValueChange = (item) => {
        setSelectedItem(item);
    };
    const renderDropdownIcon = () => {
        return (
            <Image style={[{ left: 18 }, style_img]} source={require('../../assets/imgSales/arrow.png')} />
        );
    };
    return (
        <SafeAreaView>
            <SelectDropdown
                data={week}
                onSelect={(selectedItem) => handleValueChange(selectedItem)}
                defaultButtonText={defaultButtonText}
                buttonTextStyle={[Style_Dropdown.buttonTextStyle, buttonTextStyle]}
                buttonStyle={[Style_Dropdown.buttonStyle, buttonStyle]}
                buttonTextAfterSelection={(selectedItem) => selectedItem}
                renderDropdownIcon={renderDropdownIcon}
                dropdownStyle={Style_Dropdown.dropdownStyle}
                rowTextStyle={[Style_Dropdown.rowTextStyle, rowTextStyle]}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default Dropdown;