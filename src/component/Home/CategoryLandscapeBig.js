import React from "react"
import { FlatList } from "react-native"
import CagegoryBig from "../CagegoryBig"

const CategoryLandscapeBig = ({ data }) => {
    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: 16 }}
            data={data}
            horizontal
            renderItem={({ item }) => <CagegoryBig text={item?.name} img={item?.icon} />}
        />
    )
}

export default React.memo(CategoryLandscapeBig)