"use strict";
/**
 * Type definitions and generic functions for an online shop.
 */
// Generic‑функція для пошуку товару за id у масиві товарів
const findProduct = (products, id) => {
    return products.find((item) => item.id === id);
};
// Generic‑функція для фільтрації товарів за максимальною ціною
const filterByPrice = (products, maxPrice) => {
    return products.filter((item) => item.price <= maxPrice);
};
// Generic‑функція для додавання товару в кошик
// Якщо товар вже є у кошику, то збільшує кількість
const addToCart = (cart, product, quantity) => {
    if (!product || quantity <= 0) {
        // повертаємо поточний кошик, якщо передано undefined або некоректну кількість
        return cart;
    }
    // Пошук індексу існуючого товару
    const index = cart.findIndex((item) => item.product.id === product.id);
    if (index !== -1) {
        cart[index].quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    return cart;
};
// Generic‑функція для підрахунку загальної вартості кошика
const calculateTotal = (cart) => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};
// ---- Приклади використання ----
// Масив електроніки
const electronics = [
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
const clothing = [
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
const books = [
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
// Пошук товару за id
const phone = findProduct(electronics, 1);
const tshirt = findProduct(clothing, 3);
// Фільтрація електроніки до певної ціни
const affordableElectronics = filterByPrice(electronics, 15000);
// Створення кошика та додавання товарів
let cart = [];
cart = addToCart(cart, phone, 1);
cart = addToCart(cart, tshirt, 2);
// Підрахунок загальної вартості
const totalPrice = calculateTotal(cart);
// Вивід результатів у консоль
console.log('Кошик:', cart);
console.log('Доступна електроніка:', affordableElectronics);
console.log('Загальна вартість:', totalPrice);
