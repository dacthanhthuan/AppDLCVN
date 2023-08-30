import React from "react"
import { FlatList } from "react-native"
import CagegorySmall from "../CagegorySmall"

const CategoryLandscapeSmall = ({ data }) => {
    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: 16 }}
            data={data}
            horizontal
            renderItem={({ item }) => <CagegorySmall text={item?.name} img={item?.icon} />}
        />
    )
}

export default React.memo(CategoryLandscapeSmall)