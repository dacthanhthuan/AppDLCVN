import {View} from 'react-native';
import SectionHeader from '../Home/SectionHeader';
import SlideBig from '../Home/SlideBig';
import SlideSmall from '../Home/SlideSmall';
import CarouselSlideSmall from '../Home/CarouselSlideSmall';
import CarouselSlideBig from '../Home/CarouselSlideBig';
import CategoryPortrait from '../Home/CategoryPortrait';
import CategoryLandscapeBig from '../Home/CategoryLandscapeBig';
import CategoryLandscapeSmall from '../Home/CategoryLandscapeSmall';
import Popup from '../Home/Popup';
import ListProductWarehouse from './ListProductWarehouse';
import CarouselProductWarehouse from './CarouselProductWarehouse';

type WarehouseRenderItemProps = {
  item: any;
};

export default function WarehouseRenderItem({item}: WarehouseRenderItemProps) {
  const theme: any[] = item.data.theme || [];
  const productList: any[] = item.data.l || [];
  const popup = item.data.popup || null;
  const page = item.data.page || null;

  return (
    <>
      {page > 1 ? null : (
        <>
          {theme.map((item: any, index) => {
            const layout = item.layout || {};

            return (
              <View key={item + index + new Date().getSeconds}>
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
                      <ListProductWarehouse
                        data={item.product_1_list}
                        isShowmore={layout.product_show_more == 1}
                      />
                    ) : null}
                    {item.product_2_list.length > 0 ? (
                      <ListProductWarehouse
                        data={item.product_2_list}
                        isShowmore={layout.product_show_more == 1}
                      />
                    ) : null}
                  </>
                ) : (
                  <>
                    {item.product_1_list.length > 0 ? (
                      <CarouselProductWarehouse
                        data={item.product_1_list}
                        isShowmore={layout.product_show_more == 1}
                      />
                    ) : null}
                    {item.product_2_list.length > 0 ? (
                      <CarouselProductWarehouse
                        data={item.product_2_list}
                        isShowmore={layout.product_show_more == 1}
                      />
                    ) : null}
                  </>
                )}
              </View>
            );
          })}
        </>
      )}

      {/* product list  */}
      {productList.length > 0 ? (
        <>
          {page > 1 ? null : (
            <SectionHeader title={'Gợi ý hôm nay'} isMore={false} />
          )}
          <ListProductWarehouse data={productList} isShowmore={false} />
        </>
      ) : null}

      {/* popup */}
      {popup != null ? <Popup popupData={popup} /> : null}
    </>
  );
}
