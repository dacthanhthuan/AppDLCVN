import React, {useEffect} from 'react';
import styles from './styles';
import {SafeAreaView, StatusBar, Text, SectionList} from 'react-native';

//Splash screen
import SplashScreen from 'react-native-splash-screen';

//Data
import {data1} from './data';

//Component
import SlideLargest from '../../component/Home/SlideLargest';
import SectionHeader from '../../component/Home/SectionHeader';
import CategoryItem from '../../component/Home/CategoryItem';
import TrophyOf3 from '../../component/Home/TrophyOf3';
import SlideHalf from '../../component/Home/SlideHalf';
import CarouselProduct from '../../component/Home/CarouselProduct';
import Header from '../../component/Home/Header';
import ListProduct from '../../component/Home/ListProduct';
import MutableList from '../../component/Home/MutalbeListProduct/MutableList';

const Home = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <SectionList
        showsVerticalScrollIndicator={false}
        style={styles.scrollview}
        initialNumToRender={5}
        sections={data1}
        ListHeaderComponent={<Header />}
        renderSectionHeader={({section}) =>
          section.title.length > 0 ? (
            <SectionHeader
              title={section.title}
              isMore={section.type.endsWith('/more')}
            />
          ) : null
        }
        renderItem={({item, section}) => {
          switch (true) {
            case section.type.startsWith('slide'):
              return section.type.includes('/half') ? (
                <SlideHalf item={item} />
              ) : (
                <SlideLargest
                  slide={item.source}
                  backgroundColor={item.backgroundColor}
                />
              );
            case section.type.startsWith('category'): {
              return <CategoryItem item={item} />;
            }
            case section.type.startsWith('tropy'): {
              return <TrophyOf3 item={item} />;
            }
            case section.type.startsWith('product'): {
              switch (true) {
                case section.type.includes('/carousel'):
                  return <CarouselProduct data={item} itemPerPage={2} />;
                case section.type.includes('/mutable'):
                  return <MutableList item={item} />;
                default:
                  return <ListProduct data={item} />;
              }
            }
            default:
              return <Text>{item.type}</Text>;
          }
        }}
      />
    </SafeAreaView>
  );
};
export default React.memo(Home);
