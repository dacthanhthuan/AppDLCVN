import React from 'react'
import { TouchableOpacity, Text, FlatList } from 'react-native'
import styles from './styles'

const StatusLWallet = ({ dataStatus, selectedStatus, onCategoryPress }) => {
    console.log('selectedStatus:>>', selectedStatus);
    return (
        <FlatList
            data={dataStatus}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            renderItem={({ item }) => {
                const selected = JSON.stringify(selectedStatus) === JSON.stringify(item); // Compare based on the name property
                return (
                    <TouchableOpacity key={item?.id} onPress={() => onCategoryPress(item)} style={[styles.container, selected ? styles.selectedItemContainer : {}]}>
                        <Text style={[styles.text, selected ? styles.selectedItem : {}]}>{item?.wallet_name}</Text>
                    </TouchableOpacity>
                )
            }}
        />
    )
}

export default React.memo(StatusLWallet)
