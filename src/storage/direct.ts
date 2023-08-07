export enum LOCALSTORAGE {
  // store apikey (apikey: string)
  apikey = 'apikey',

  // store domain (main_domain: string)
  main_domain = 'main_domain',

  // store user information {...user, loading: true/false, login:{...}, register: {...}}
  user = 'user',

  // store product list data
  product_list = 'product_list',

  // store user cart {data: *cart data}
  cart = 'user_cart',

  // store state user is seen popup in today {popup: object[], day: Date()}
  today_popup = 'today_popup',

  // store biometric sensor information on device {available: true/false, type: BiometricsType}
  biometric = 'biometric',

  // store biometric login options (option: true/false)
  biometric_login_option = 'biometric_login_option',

  // store publickey for verify user login (publickey: ...)
  publickey = 'publickey',

  // store data to login by biometric {mobile: string, password: string}
  biometric_login_data = 'biometric_login_data',

  // store search recent data (max 10 search recent) {data: string[]}
  search_recent = 'search_recent',
}
