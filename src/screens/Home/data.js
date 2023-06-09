const tropy = require('../../assets/Home/Rectangle405.png');

/**
 * @type: *first/*second.../more
 ** *first: type to show
 [
    -slide: Slide
    -product: Product
    -category: Category product
    -trophy: top 3 of ...
 ]
 ** *second... : optional (
  *** -carousel: using carousel to display
  *** -mutable: using carousel with radio button to change item display
 )
 ** /more: if title have "More" option
 */
export const data1 = [
  {
    type: 'slide/carousel',
    title: '',
    data: [
      [
        {
          source: require('../../assets/Home/Rectangle324.png'),
        },
        {
          source: require('../../assets/Home/Rectangle369.png'),
        },
        {
          source: require('../../assets/Home/Rectangle398.png'),
        },
        {
          source: require('../../assets/Home/Rectangle369.png'),
        },
      ],
    ],
  },
  {
    type: 'category/more',
    title: 'Danh mục',
    data: [
      [
        {
          title: 'TPCN',
          source: require('../../assets/Home/Rectangle377.png'),
        },
        {
          title: 'Sữa',
          source: require('../../assets/Home/Rectangle378.png'),
        },
        {
          title: 'Dưỡng da',
          source: require('../../assets/Home/Rectangle379.png'),
        },
        {
          title: 'Chống nắng',
          source: require('../../assets/Home/Rectangle380.png'),
        },
        {
          title: 'Dưỡng da',
          source: require('../../assets/Home/Rectangle379.png'),
        },
        {
          title: 'Sữa',
          source: require('../../assets/Home/Rectangle378.png'),
        },
      ],
    ],
  },
  {
    type: 'tropy',
    title: 'Top sản phẩm',
    data: [
      [
        {
          title: 'bán chạy nhất',
          source: tropy,
          backgroundColor: '#A81811',
        },
        {
          title: 'chiết khấu cao',
          source: tropy,
          backgroundColor: '#09355C',
        },
        {
          title: 'được đề xuất',
          source: tropy,
          backgroundColor: '#F56318',
        },
      ],
    ],
  },
  {
    type: 'slide',
    title: 'Ưu đãi đặc biệt tháng này',
    data: [
      {
        source: require('../../assets/Home/Rectangle369.png'),
      },
    ],
  },
  {
    type: 'slide/half',
    title: '',
    data: [
      [
        {
          source: require('../../assets/Home/Rectangle370.png'),
        },
        {
          source: require('../../assets/Home/Rectangle371.png'),
        },
        {
          source: require('../../assets/Home/Rectangle373.png'),
        },
        {
          source: require('../../assets/Home/Rectangle372.png'),
        },
      ],
    ],
  },
  {
    type: 'product/mutable',
    title: '',
    data: [
      [
        {
          value: 'best_seller',
          title: 'Bán chạy',
          source: require('../../assets/Home/Rectangle388.png'),
          data: [
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
          ],
        },
        {
          value: 'high_discounts',
          title: 'Chiết khấu cao',
          source: require('../../assets/Home/Rectangle386.png'),
          data: [
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
          ],
        },
        {
          value: 'buy_one_get_one',
          title: 'Mua 1 tặng 1',
          source: require('../../assets/Home/Rectangle387.png'),
          data: [
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
          ],
        },
      ],
    ],
  },
  {
    type: 'product/carousel/more',
    title: 'Sản phẩm ưu đãi',
    data: [
      [
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
      ],
    ],
  },
  {
    type: 'slide',
    title: 'Gợi ý cho bạn',
    data: [
      {
        source: require('../../assets/Home/Rectangle398.png'),
      },
    ],
  },
  {
    type: 'product',
    title: '',
    data: [
      [
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
      ],
    ],
  },
];

export const data2 = [
  {
    type: 'slide/carousel',
    title: '',
    data: [
      [
        {
          source: require('../../assets/Home/Rectangle324.png'),
        },
        {
          source: require('../../assets/Home/Rectangle398.png'),
        },
        {
          source: require('../../assets/Home/Rectangle369.png'),
        },
        {
          source: require('../../assets/Home/Rectangle398.png'),
        },
      ],
    ],
  },
  {
    type: 'tropy',
    title: 'Top sản phẩm',
    data: [
      [
        {
          title: 'bán chạy nhất',
          source: tropy,
          backgroundColor: '#A81811',
        },
        {
          title: 'chiết khấu cao',
          source: tropy,
          backgroundColor: '#09355C',
        },
        {
          title: 'được đề xuất',
          source: tropy,
          backgroundColor: '#F56318',
        },
      ],
    ],
  },
  {
    type: 'slide',
    title: 'Ưu đãi đặc biệt tháng này',
    data: [
      {
        source: require('../../assets/Home/Rectangle369.png'),
      },
    ],
  },
  {
    type: 'product/mutable',
    title: '',
    data: [
      [
        {
          value: 'best_seller',
          title: 'Bán chạy',
          source: require('../../assets/Home/Rectangle388.png'),
          data: [
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
          ],
        },
        {
          value: 'high_discounts',
          title: 'Chiết khấu cao',
          source: require('../../assets/Home/Rectangle386.png'),
          data: [
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
          ],
        },
        {
          value: 'buy_one_get_one',
          title: 'Mua 1 tặng 1',
          source: require('../../assets/Home/Rectangle387.png'),
          data: [
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'DLC Brazil Green Propolis',
              promotion: {
                type: 'discount',
                title: 'Giảm 10%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 700000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle374.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'gift',
                title: '1 tặng 1',
                value: 1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
            {
              title: 'Viên uống DLC Antrodia Cinnamomea',
              promotion: {
                type: 'discount',
                title: 'Giảm 5%',
                value: 0.1,
              },
              priceBefore: 800000,
              price: 800000,
              commission: 300000,
              source: require('../../assets/Home/Rectangle376.png'),
            },
          ],
        },
      ],
    ],
  },
  {
    type: 'slide',
    title: '',
    data: [
      {
        source: require('../../assets/Home/Rectangle398.png'),
      },
    ],
  },
  {
    type: 'slide/half',
    title: '',
    data: [
      [
        {
          source: require('../../assets/Home/Rectangle370.png'),
        },
        {
          source: require('../../assets/Home/Rectangle371.png'),
        },
        {
          source: require('../../assets/Home/Rectangle373.png'),
        },
        {
          source: require('../../assets/Home/Rectangle372.png'),
        },
      ],
    ],
  },
  {
    type: 'product/carousel/more',
    title: 'Sản phẩm ưu đãi',
    data: [
      [
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
      ],
    ],
  },
  {
    type: 'category/more',
    title: 'Danh mục',
    data: [
      [
        {
          title: 'TPCN',
          source: require('../../assets/Home/Rectangle377.png'),
        },
        {
          title: 'Sữa',
          source: require('../../assets/Home/Rectangle378.png'),
        },
        {
          title: 'Dưỡng da',
          source: require('../../assets/Home/Rectangle379.png'),
        },
        {
          title: 'Chống nắng',
          source: require('../../assets/Home/Rectangle380.png'),
        },
        {
          title: 'Dưỡng da',
          source: require('../../assets/Home/Rectangle379.png'),
        },
        {
          title: 'Sữa',
          source: require('../../assets/Home/Rectangle378.png'),
        },
      ],
    ],
  },
  {
    type: 'product',
    title: '',
    data: [
      [
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
      ],
    ],
  },
  {
    type: 'slide',
    title: 'Gợi ý cho bạn',
    data: [
      {
        source: require('../../assets/Home/Rectangle398.png'),
      },
    ],
  },
  {
    type: 'product',
    title: '',
    data: [
      [
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
      ],
    ],
  },
  {
    type: 'product',
    title: '',
    data: [
      [
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
        {
          source: require('../../assets/Home/Rectangle293.png'),
          title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
          idProduct: 'AUS01',
          price: 1080000,
          commission: 380000,
        },
      ],
    ],
  },
];
