/**
 *  * Giải pháp: Sử dụng Context đồng thời kết hợp với Reducer của react native để lược bỏ đi props là function.
 * Logic để thực hiện: https://react.dev/learn/scaling-up-with-reducer-and-context
 Ta sẽ tạo reducer gồm một initialState chứa:
 {all-check: false, force_change: false, checkboxs: []}
  trong đó all-check là trạng thái all-check, force_change là giá trị quyết định các checkbox con có nên thay đổi đồng bộ với giá trị all_check hay không, và checkboxs sẽ là một mảng chứa giá trị duy nhất của checkbox đã được check. Điều này giúp cho việc đọc các giá trị của checkbox đã được kích hoạt thông qua reducer mà không cần phải truyền trạng thái thông qua props.
  Các Checkbox con sẽ theo dõi trạng thái của all_check và force_change, nếu force_change là true thì các checkbox này sẽ thực hiện thay đổi đồng bộ với giá trị all_check. Ngược lại, nếu force_change bằng false, thì các giá trị checkbox con sẽ không thực hiện cập nhật theo all_check.
  Đồng thời, chúng ta sẽ kiểm tra nếu độ dài mảng dữ liệu hiển thị bằng với độ dài mảng checboxs thì sẽ thay đổi all_check bắt buộc (force_change là true), ngược lại, nếu độ dài của mảng checkboxs nhỏ hơn độ dài dữ liệu thì sẽ thay đổi all_check không bắt buộc (force_change bằng false). Cách làm này giúp cho việc bỏ chọn một checkbox khi all_check là true sẽ không thay đổi toàn bộ các checkbox khác.
 * Component này là một ví dụ về cách sử dụng AllCheckContext và AllCheckDispatchContext.
 */

import {FlatList, View} from 'react-native';
import {AllCheckProvider} from './context';
import CheckBoxInFlatList from './CheckBoxInFlatList';
import AllCheckBox from './AllCheckBox';
import {memo} from 'react';

function AllCheckBoxGroup() {
  const data = new Array(10).fill(0);
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => {
          return <CheckBoxInFlatList unique={index} />;
        }}
      />
      <AllCheckBox dataLength={data.length} text="All Check Button" />
    </View>
  );
}

function AllCheckBoxGroupWrapper() {
  return (
    <AllCheckProvider>
      <AllCheckBoxGroup />
    </AllCheckProvider>
  );
}

export default memo(AllCheckBoxGroupWrapper);
