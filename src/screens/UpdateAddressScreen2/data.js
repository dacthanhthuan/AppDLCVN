export const button = [
  {
    title: 'Tỉnh/Thành phố',
    value: 'provinces',
  },
  {
    title: 'Quận/Huyện',
    value: 'districts',
  },
  {
    title: 'Phường/Xã',
    value: 'wards',
  },
];

export const fetchProvince = async () => {
  return await fetch('https://provinces.open-api.vn/api/p/').then(res =>
    res.json(),
  );
};

export const fetchDistrict = async provinceCode => {
  return await fetch(
    `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`,
  ).then(res => res.json());
};

export const fetchWard = async districtCode => {
  return await fetch(
    `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`,
  ).then(res => res.json());
};

export const fetchData = async selectItem => {
  let data = [];
  switch (selectItem?.value) {
    case 'provinces':
      await fetchProvince().then(res => {
        data = res.map(item => ({
          ...item,
          value: item.codename,
          type: 'province',
        }));
      });
      break;
    case 'districts':
      button[0].code
        ? await fetchDistrict(button[0].code).then(res => {
            data = res.districts.map(item => ({
              ...item,
              value: item.codename,
              type: 'district',
            }));
          })
        : null;
      break;
    case 'wards':
      button[1].code
        ? await fetchWard(button[1].code).then(res => {
            data = res.wards.map(item => ({
              ...item,
              value: item.codename,
              type: 'ward',
            }));
          })
        : null;
      break;
  }
  return data;
};
