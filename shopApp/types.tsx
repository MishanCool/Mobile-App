export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  ShopList: undefined;
  shopView: { shopId?: string; title?: string };
};

export type TabTwoParamList = {
  MyShopList: undefined;
  CreateShop: undefined;
  ShopView: { shopId?: string, title?: string };
  AddProducts: { shopId?: string };
};

export type AuthParamList = {
  Login: undefined;
  Register: undefined;
};

export type User = {
  username?: string;
  phone?: string;
  address?: string;
  shops?: Array<string | null>;
};

export type Shop = {
  ownerId?: string;
  shopId?: string;
  shopname?: string;
  contact?: string;
  address?: string;
  description?: string;
  products?: Array<Product>
}

export type Product = {
  productId?: string;
  name?: string;
  description?: string;
  price?: string;
  image?: string;
}