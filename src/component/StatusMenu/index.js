import React from 'react'
import { TouchableOpacity, View, Text, FlatList } from 'react-native'
import styles from './styles'

const StatusMenu = ({ categori, selectedCatogory, onCategoryPress }) => {
    return (
        <FlatList
            data={categori}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                const selected = selectedCatogory === item;
                return (
                    <TouchableOpacity onPress={() => onCategoryPress(item)} style={[styles.container, selected ? styles.selectedItemContainer : {}]}>
                        <Text style={[styles.text, selected ? styles.selectedItem : {}]}>{item}</Text>
                    </TouchableOpacity>
                )
            }}
        />
    )
}

export default React.memo(StatusMenu)