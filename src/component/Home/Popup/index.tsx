import {Icon, Overlay} from '@rneui/themed';
import ImageButton from '../ImageButton';
import {TouchableOpacity} from 'react-native';
import {memo, useEffect, useState} from 'react';
import style from './style';
import {getData, storeData} from '../../../storage';
import {LOCALSTORAGE} from '../../../storage/direct';

type PopupProps = {
  popupData: any[];
};

export default function Popup({popupData}: PopupProps) {
  const [visible, setVisible] = useState(false); // visible popup state
  const [popup, setPopup] = useState(popupData); // popup data
  const [popupLength, setPopupLength] = useState(popupData.length); // popup length
  const [popupList, setPopupList] = useState<string[]>([]); // popup list to save popup what is seen

  // save popup is seen to localstorage
  const saveTodayPopup = async () => {
    await storeData(LOCALSTORAGE.today_popup, {
      popup: popupList,
      day: new Date().toLocaleDateString(),
    });
  };

  // check today popup
  const checkTodayPopup = async () => {
    try {
      const todayPopup = await getData(LOCALSTORAGE.today_popup);
      // if todayPopup data is exist then
      if (todayPopup) {
        // get and compare day
        let today = new Date().toLocaleDateString();
        if (today === todayPopup.day) {
          // if today, filter popup is seen
          let filterPopup: any[] = popupData.filter(
            p => !todayPopup.popup.some((td: any) => p.id === td.id),
          );

          // if not exist new popup
          if (filterPopup.length <= 0) {
            setPopup([]);
          } else {
            // otherwise, exist new popup set data for popup and visible
            setPopup(filterPopup);
            setVisible(true);
          }

          // set data to save in local and popuplength to invoked useeffect
          setPopupList(todayPopup.popup);
          setPopupLength(filterPopup.length);
        }
      } else {
        setVisible(true);
      }
    } catch (error: any) {
      throw new Error(
        'ERROR WHEN CHECK TODAY POPUP - POPUP COMPONENT - ' + error.message,
      );
    }
  };

  // check to set visible for popup
  useEffect(() => {
    if (popupLength <= 0) {
      saveTodayPopup();
      setVisible(false);
    }
  }, [popupLength]);

  // call when initial render popup
  useEffect(() => {
    checkTodayPopup();
  }, []);

  return (
    <Overlay isVisible={visible} style={style.container}>
      {popup.map((item, index) => {
        return index + 1 === popupLength ? (
          <RenderItem
            imageSrc={{uri: item.link_image}}
            key={index + item.link_image}
            onClose={() => {
              setPopupList(array => [...array, item]);
              setPopupLength(value => value - 1);
            }}
          />
        ) : null;
      })}
    </Overlay>
  );
}

type RenderItemProps = {
  imageSrc: any;
  onPress?: () => void;
  onClose?: () => void;
};

const RenderItem = memo(
  function ({imageSrc, onPress, onClose}: RenderItemProps) {
    const [visible, setVisible] = useState(true);

    const toggleVisible = () => {
      setVisible(!visible);
    };

    useEffect(() => {
      if (!visible) {
        onClose!();
      }
    }, [visible]);

    return visible ? (
      <>
        <ImageButton
          imagesource={imageSrc}
          containerStyle={style.containerImageStyle}
          imageStyle={style.imageStyle}
          textStlye={undefined}
          text={undefined}
          onPress={onPress}
          resizeMode={undefined}
        />
        <TouchableOpacity onPress={toggleVisible} style={style.closeIcon}>
          <Icon name="close" size={30} />
        </TouchableOpacity>
      </>
    ) : null;
  },
  (pre, next) => JSON.stringify(pre.imageSrc) === JSON.stringify(next.imageSrc),
);
