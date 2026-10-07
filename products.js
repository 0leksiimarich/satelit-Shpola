// ============================================================
// products.js — джерело товарів (ЕТАП 1)
// ------------------------------------------------------------
// УВАГА: товари нижче — ДЕМО-ДАНІ ТИПУ «ПРИКЛАД».
// Вони потрібні лише для тестування архітектури.
// Це НЕ реальний асортимент магазину «Сателіт».
//
// Коли отримаєте реальні товари та ціни — просто замініть
// масив DEMO_PRODUCTS або (на ЕТАПІ 4) увімкніть завантаження
// з колекції Firestore "products".
//
// Структура товара = структура Firestore-документа:
// { id, name, description, price, category, image, stock, featured, sale }
// ============================================================

export const CATEGORIES = [
  { id: "batteries", name: "Батарейки" },
  { id: "tvbox",     name: "TV Box" },
  { id: "antennas",  name: "Антени" },
  { id: "cables",    name: "Кабелі" },
  { id: "accessories", name: "Аксесуари" },
  { id: "other",     name: "Інше" }
];

// Демо-товари. Кожен названий із префіксом "[Приклад]",
// щоб жоден користувач не сприйняв їх як реальні.
export const DEMO_PRODUCTS = [
  {
    id: "demo-tvbox-1",
    name: "[Приклад] TV Box Android 4K",
    description: "Демонстраційна картка товару. Замінити на реальний товар.",
    price: 1299,
    category: "tvbox",
    image: "assets/img-placeholder.svg",
    stock: 0, // 0 = залишок ще не задано (не вигаданий!)
    featured: true,
    sale: false
  },
  {
    id: "demo-battery-1",
    name: "[Приклад] Батарейки AA, 4 шт.",
    description: "Демонстраційна картка товару. Замінити на реальний товар.",
    price: 59,
    category: "batteries",
    image: "assets/img-placeholder.svg",
    stock: 0,
    featured: true,
    sale: false
  },
  {
    id: "demo-antenna-1",
    name: "[Приклад] Антена цифрова DVB-T2",
    description: "Демонстраційна картка товару. Замінити на реальний товар.",
    price: 349,
    category: "antennas",
    image: "assets/img-placeholder.svg",
    stock: 0,
    featured: false,
    sale: false
  },
  {
    id: "demo-cable-1",
    name: "[Приклад] Кабель HDMI 2 м",
    description: "Демонстраційна картка товару. Замінити на реальний товар.",
    price: 149,
    category: "cables",
    image: "assets/img-placeholder.svg",
    stock: 0,
    featured: false,
    sale: false
  },
  {
    id: "demo-acc-1",
    name: "[Приклад] Пульт універсальний",
    description: "Демонстраційна картка товару. Замінити на реальний товар.",
    price: 199,
    category: "accessories",
    image: "assets/img-placeholder.svg",
    stock: 0,
    featured: false,
    sale: false
  },
  {
    id: "demo-other-1",
    name: "[Приклад] Подовжувач 3 м",
    description: "Демонстраційна картка товару. Замінити на реальний товар.",
    price: 129,
    category: "other",
    image: "assets/img-placeholder.svg",
    stock: 0,
    featured: false,
    sale: false
  }
];

// Форматування ціни: тільки гривня (₴), без доларів.
export function formatPrice(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("uk-UA") + " ₴";
}

// Отримання списку товарів.
// На ЕТАПІ 4 тут з'явиться читання з Firestore;
// поки що — демо-дані.
export async function getProducts() {
  // TODO (ЕТАП 4): завантаження з колекції "products",
  // якщо firebaseConfig реальний.
  return DEMO_PRODUCTS;
}

export function getProductById(id) {
  return DEMO_PRODUCTS.find((p) => p.id === id) || null;
}

export function getCategoryName(categoryId) {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  return cat ? cat.name : "Інше";
}
