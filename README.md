# TravelTrucks

TravelTrucks — це фронтенд-додаток для компанії, що займається орендою кемперів. Ви можете переглядати каталог транспортних засобів, фільтрувати за характеристиками, додавати кемпери до улюблених та оформлювати бронювання.

## 🔗 Демо

https://travel-trucks-test-task-rho.vercel.app/

---

## 🛆 Технології

* React
* Redux Toolkit
* React Router
* Axios
* Vite
* CSS Modules

---

## ⚙️ Встановлення

1. Клонуйте репозиторій:

git clone https://github.com/NelliPestych/travel-trucks-test-task.git

2. Встановіть залежності:

npm install

3. Запустіть проєкт локально:

npm run dev

## 📁 Структура проєкту

```
├── public/             # Директорія з публічнми файлами
├── src/
│   ├── assets/         # Іконки, зображення
│   ├── components/     # Компоненти інтерфейсу
│   ├── redux/          # Redux-store and Redux-slices
│   ├── pages/          # Сторінки (Home, Catalog, CamperDetails)
│   ├── routes/         # роути
│   ├── styles/         # variables.css з винесеними основними стилями у змінні
│   ├── App.jsx
│   ├── main.jsx
│   ├── vite.config.js  # Конфігурації проєкту vite
│   └── vercel.json     # Конфігурації для коректного роутінгу на versel
```

---

## 📌 Функціонал

* 🔍 Каталог кемперів із фільтрами (location, form, features)
* ❤️ Додавання у улюблене
* 🔄 Load More (пагінація)
* 🛍 Перегляд деталей по кемперу
* ✉️ Форма бронювання
* ✅ Валідація форм
* 📲 Адаптація для десктопів

---

## 📡 API
https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers
