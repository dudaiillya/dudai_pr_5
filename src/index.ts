/**
 * Type definitions and generic functions for an online shop.
 */

type BaseProduct = {
  id: number;
  name: string;
  price: number;
  description?: string; // додатковий опис
};

type Electronics = BaseProduct & {
  category: 'electronics';
  warrantyPeriod: number; // місяці гарантії
  brand: string;
};

type Clothing = BaseProduct & {
  category: 'clothing';
  size: string;
  material: string;
};

type Book = BaseProduct & {
  category: 'book';
  author: string;
  pages: number;
};

// Generic function to find a product by id in any array of products.
const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
  return products.find((item) => item.id === id);
};

// Generic function to filter products by maximum price.
const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
  return products.filter((item) => item.price <= maxPrice);
};

// Generic type for cart item.
type CartItem<T> = {
  product: T;
  quantity: number;
};

// Generic function to add a product to the cart.
// If the product already exists in the cart, increase its quantity.
const addToCart = <T extends BaseProduct>(cart: CartItem<T>[], product: T | undefined, quantity: number): CartItem<T>[] => {
  if (!product || quantity <= 0) {
    // повертаємо поточний кошик, якщо передано undefined або некоректна кількість
    return cart;
  }
  // знайти індекс існуючого товару в кошику
  const index = cart.findIndex(item => item.product.id === product.id);
  if (index !== -1) {
    cart[index].quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  return cart;
};

// Generic function to calculate total price of the cart.
const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

// ---- Приклади використання ----

// Масив електроніки
const electronics: Electronics[] = [
  {
    id: 1,
    name: 'Телефон',
    price: 10000,
    category: 'electronics',
    warrantyPeriod: 24,
    brand: 'Samsung',
    description: 'Смартфон з великим екраном'
  },
  {
    id: 2,
    name: 'Ноутбук',
    price: 30000,
    category: 'electronics',
    warrantyPeriod: 12,
    brand: 'Dell',
    description: 'Універсальний ноутбук'
  }
];

// Масив одягу
const clothing: Clothing[] = [
  {
    id: 3,
    name: 'Футболка',
    price: 500,
    category: 'clothing',
    size: 'L',
    material: 'Бавовна',
    description: 'Чорна футболка'
  }
];

// Масив книг
const books: Book[] = [
  {
    id: 4,
    name: 'Книга про TypeScript',
    price: 700,
    category: 'book',
    author: 'Іван Петренко',
    pages: 300,
    description: 'Навчальна книга'
  }
];

// Пошук товару
const phone = findProduct(electronics, 1);
const tshirt = findProduct(clothing, 3);

// Фільтрація електроніки за ціною до 15000
const affordableElectronics = filterByPrice(electronics, 15000);

// Створення кошика та додавання товарів
let cart: CartItem<BaseProduct>[] = [];
cart = addToCart(cart, phone, 1);
cart = addToCart(cart, tshirt, 2);

// Підрахунок загальної вартості
const totalPrice = calculateTotal(cart);

// Вивід результатів
console.log('Кошик:', cart);
console.log('Доступна електроніка:', affordableElectronics);
console.log('Загальна вартість:', totalPrice);
