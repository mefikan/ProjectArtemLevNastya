// Подключаем необходимые зависимости
const { DataTypes } = require('sequelize');
const models = require('./models.js'); // Путь к вашему модулю models.js

// Деструктурируем объект models для доступа к константам
const {
    User,
    Swipe,
    Note,
    Restaurant,
    FavoritePlaces,
    Address,
    Dish,
    Menu,
    Foodproperty,
    Visit_restaurant
} = models;

describe('Проверка наличия констант', () => {
    it('должен существовать объект User', () => {
        expect(User).toBeDefined();
    });

    it('должен существовать объект Swipe', () => {
        expect(Swipe).toBeDefined();
    });

    it('должен существовать объект Note', () => {
        expect(Note).toBeDefined();
    });

    it('должен существовать объект Restaurant', () => {
        expect(Restaurant).toBeDefined();
    });

    it('должен существовать объект FavoritePlaces', () => {
        expect(FavoritePlaces).toBeDefined();
    });

    it('должен существовать объект Address', () => {
        expect(Address).toBeDefined();
    });

    it('должен существовать объект Dish', () => {
        expect(Dish).toBeDefined();
    });

    it('должен существовать объект Menu', () => {
        expect(Menu).toBeDefined();
    });

    it('должен существовать объект Foodproperty', () => {
        expect(Foodproperty).toBeDefined();
    });

    it('должен существовать объект Visit_restaurant', () => {
        expect(Visit_restaurant).toBeDefined();
    });
});
