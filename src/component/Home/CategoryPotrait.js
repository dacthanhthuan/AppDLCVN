import React from "react";
import { FlatList } from 'react-native'
import CagegoryPotrait from "../CagegoryPotrait";

const CategoryPotrait = ({ data }) => {
    return (
        <FlatList
            numColumns={2}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CagegoryPotrait img={item?.icon} />}
        />
    )
}

export default React.memo(CategoryPotrait);