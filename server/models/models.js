const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
    idUser: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Swipes = sequelize.define('swipes', {
    idswipes: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tag: {type: DataTypes.STRING},
    boolArray: {type: DataTypes.STRING},
})

const Note = sequelize.define('note', {
    idNote: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING},
    title: {type: DataTypes.STRING},
    date: {type: DataTypes.DATE},
})

const Restaurant = sequelize.define('restaurant', {
    idRestaurant: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true,},
    rating: {type: DataTypes.INTEGER},
    properties: {type: DataTypes.STRING},
})

const FavoritePlaces = sequelize.define('favoritePlaces', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Address = sequelize.define('address', {
    idAddress: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    locationLongtitude: {type: DataTypes.DECIMAL(9)},
    locationLatitude: {type: DataTypes.DECIMAL(9)},
    address: {type: DataTypes.STRING, unique: true,},
})

const Weight = sequelize.define('weight', {
    idWeight: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    weight: {type: DataTypes.INTEGER},
})

const Dish = sequelize.define('dish', {
    idDish: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    dishName: {type: DataTypes.STRING},
})

const Menu = sequelize.define('menu', {
    dishPrice: {type: DataTypes.STRING},
})

const Foodproperty = sequelize.define('foodproperty', {
    idfoodproperty: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    propertyname: {type: DataTypes.STRING},
})

const Visit_restaurant = sequelize.define('visit_restaurant', {
    idVisit: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE},
    review: {type: DataTypes.STRING},
    visitCount: {type: DataTypes.INTEGER},
    Rate: {type: DataTypes.INTEGER},
    visit_restaurantcol: {type: DataTypes.STRING},
})



User.hasMany(Swipes)
Swipes.belongsTo(User)

User.hasMany(Note)
Note.belongsTo(User)

User.belongsToMany(Restaurant, {through: FavoritePlaces})
Restaurant.belongsToMany(User, {through: FavoritePlaces})

User.hasMany(Visit_restaurant)
Visit_restaurant.belongsTo(User)

Restaurant.hasMany(Visit_restaurant)
Visit_restaurant.belongsTo(Restaurant)

Restaurant.hasOne(Address)
Address.belongsTo(Restaurant)

Restaurant.hasOne(Menu)
Menu.belongsTo(Restaurant)

Dish.hasMany(Menu)
Menu.belongsTo(Dish)

Dish.hasOne(Foodproperty)
Foodproperty.belongsTo(Dish)

Weight.hasMany(Dish)
Dish.belongsTo(Weight)


module.exports = {
    User,
    Swipes,
    Note,
    Restaurant,
    FavoritePlaces,
    Address,
    Weight,
    Dish,
    Menu,
    Foodproperty,
    Visit_restaurant
}