import {View} from 'react-native';
import SectionHeader from '../SectionHeader';
import ListProduct from '../ListProduct';
import CarouselProduct from '../CarouselProduct';
import SlideSmall from '../SlideSmall';
import CategoryLandscapeBig from '../CategoryLandscapeBig';
import Popup from '../Popup';
import SlideBig from '../SlideBig';
import CategoryPortrait from '../CategoryPortrait';
import CategoryLandscapeSmall from '../CategoryLandscapeSmall';
import CarouselSlideSmall from '../CarouselSlideSmall';
import CarouselSlideBig from '../CarouselSlideBig';

export default function HomeSectionRenderItem({item}: any) {
  const theme: any[] = item.data.theme || [];
  const productList: any[] = item.data.l || [];
  const popup = item.data.popup || null;

  return (
    <>
      {theme.map((item: any, index) => {
        const layout = item.layout || {};

        return (
          <View key={item + index}>
            {/* header item */}
            {item.name_show == 1 ? (
              <SectionHeader
                title={item.name}
                isMore={item.name_show_more == 1}
              />
            ) : null}

            {/* slide item */}
            {layout.slide_size === 'small' ? (
              <>
                {item.slide_list.length > 1 ? (
                  <CarouselSlideSmall data={item.slide_list} />
                ) : item.slide_list.length > 0 ? (
                  <SlideSmall
                    slide={{uri: item.slide_list[0]?.banner}}
                    backgroundColor=""
                  />
                ) : null}
              </>
            ) : (
              <>
                <>
                  {item.slide_list.length > 1 ? (
                    <CarouselSlideBig data={item.slide_list} />
                  ) : item.slide_list.length > 0 ? (
                    <SlideBig
                      slide={{uri: item.slide_list[0]?.banner}}
                      backgroundColor=""
                    />
                  ) : null}
                </>
              </>
            )}

            {/* category item */}
            {layout.cate === 'portrait' ? (
              <>
                {item.category_1_list?.length > 0 ? (
                  <CategoryPortrait
                    item={item.category_1_list}
                    isShowmore={layout.cate_show_more == 1}
                  />
                ) : null}
                {item.category_2_list?.length > 0 ? (
                  <CategoryPortrait
                    item={item.category_2_list}
                    isShowmore={layout.cate_show_more == 1}
                  />
                ) : null}
              </>
            ) : (
              <>
                {layout.slide_cate === 'big' ? (
                  <>
                    {item.category_1_list?.length > 0 ? (
                      <CategoryLandscapeBig
                        item={item.category_1_list}
                        isShowmore={layout.cate_show_more == 1}
                      />
                    ) : null}
                    {item.category_2_list?.length > 0 ? (
                      <CategoryLandscapeBig
                        item={item.category_2_list}
                        isShowmore={layout.cate_show_more == 1}
                      />
                    ) : null}
                  </>
                ) : (
                  <>
                    {item.category_1_list?.length > 0 ? (
                      <CategoryLandscapeSmall
                        item={item.category_1_list}
                        isShowmore={layout.cate_show_more == 1}
                      />
                    ) : null}
                    {item.category_2_list?.length > 0 ? (
                      <CategoryLandscapeSmall
                        item={item.category_2_list}
                        isShowmore={layout.cate_show_more == 1}
                      />
                    ) : null}
                  </>
                )}
              </>
            )}

            {/* product item */}
            {layout.product === 'portrait' ? (
              <>
                {item.product_1_list.length > 0 ? (
                  <ListProduct
                    data={item.product_1_list}
                    isShowmore={layout.product_show_more == 1}
                  />
                ) : null}
                {item.product_2_list.length > 0 ? (
                  <ListProduct
                    data={item.product_2_list}
                    isShowmore={layout.product_show_more == 1}
                  />
                ) : null}
              </>
            ) : (
              <>
                {item.product_1_list.length > 0 ? (
                  <CarouselProduct
                    data={item.product_1_list}
                    isShowmore={layout.product_show_more == 1}
                  />
                ) : null}
                {item.product_2_list.length > 0 ? (
                  <CarouselProduct
                    data={item.product_2_list}
                    isShowmore={layout.product_show_more == 1}
                  />
                ) : null}
              </>
            )}
          </View>
        );
      })}
      {productList.length > 0 ? (
        <>
          <SectionHeader title={'Gợi ý hôm nay'} isMore={false} />
          <ListProduct data={productList} />
        </>
      ) : null}

      {popup != null ? <Popup popupData={popup} /> : null}
    </>
  );
}