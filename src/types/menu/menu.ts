export enum MenuPaths {
  Home = '',
  Dashboard = '/',
  Category = 'category',
  SubCategory = 'subcategory',
  Brand = "Brand",
  Product = 'product',
  Order = 'order',
  Setting = 'setting'
}
export enum RouteName {
  Home = 'Home',
  Dashboard = 'Dashboard',
  Category = 'Category',
  SubCategory = 'Sub Category',
  Brand = "Brand",
  Product = 'Product',
  Order = 'Order',
  Setting = 'Setting'
}

export interface MenuItem {
  name: string;
  path: MenuPaths;
}

export const menuItems: MenuItem[] = [
  { name: 'Dashboard', path: MenuPaths.Dashboard },
  { name: 'Category', path: MenuPaths.Category },
  { name: 'Sub Category', path: MenuPaths.SubCategory },
  { name: 'Product', path: MenuPaths.Product },
  { name: 'Brand', path: MenuPaths.Brand },
  { name: 'Order', path: MenuPaths.Order },
  { name: 'Setting', path: MenuPaths.Setting }
];
