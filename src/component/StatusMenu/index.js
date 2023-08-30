import React from 'react'
import { TouchableOpacity, Text, FlatList } from 'react-native'
import styles from './styles'

const StatusMenu = ({ dataStatus, selectedStatus, onCategoryPress }) => {
    return (
        <FlatList
            data={dataStatus}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => String(item?.id)}
            renderItem={({ item }) => {
                const selected = JSON.stringify(selectedStatus) === JSON.stringify(item); // Compare based on the name property
                return (
                    <TouchableOpacity onPress={() => onCategoryPress(item)} style={[styles.container, selected ? styles.selectedItemContainer : {}]}>
                        <Text style={[styles.text, selected ? styles.selectedItem : {}]}>{item?.name}</Text>
                    </TouchableOpacity>
                )
            }}
        />
    )
}

export default React.memo(StatusMenu)
