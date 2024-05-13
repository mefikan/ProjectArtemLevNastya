const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
    idUser: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Swipe = sequelize.define('Swipe', {
    idswipes: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tag: {type: DataTypes.STRING}
})

const Note = sequelize.define('Note', {
    idNote: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING},
    title: {type: DataTypes.STRING},
    date: {type: DataTypes.DATE}
})

const Restaurant = sequelize.define('Restaurant', {
    idRestaurant: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true,},
    rating: {type: DataTypes.DECIMAL(2)},
    properties: {type: DataTypes.STRING}
})

const FavoritePlaces = sequelize.define('FavoritePlaces', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Address = sequelize.define('Address', {
    idAddress: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    locationLongtitude: {type: DataTypes.DECIMAL(9)},
    locationLatitude: {type: DataTypes.DECIMAL(9)},
    address: {type: DataTypes.STRING, unique: true}
})

const Dish = sequelize.define('Dish', {
    idDish: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    dishName: {type: DataTypes.STRING},
    dishSize: {type: DataTypes.STRING},
    dishTag: {type: DataTypes.STRING}
})

const Menu = sequelize.define('Menu', {
    dishPrice: {type: DataTypes.STRING}
})

const Foodproperty = sequelize.define('Foodproperty', {
    idfoodproperty: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    propertyname: {type: DataTypes.STRING}
})
const SwipeFoodproperty = sequelize.define('SwipeFoodproperty', {
    idfoodproperty: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    propertyname: {type: DataTypes.STRING}
})

const Visit_restaurant = sequelize.define('Visit_restaurant', {
    idVisit: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE},
    review: {type: DataTypes.STRING},
    visitCount: {type: DataTypes.INTEGER},
    Rate: {type: DataTypes.INTEGER},
    visit_restaurantcol: {type: DataTypes.STRING}
})

User.hasMany(Swipe)
Swipe.belongsTo(User)

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

Dish.hasMany(Foodproperty)
Foodproperty.belongsTo(Dish)

Swipe.hasMany(SwipeFoodproperty)
SwipeFoodproperty.belongsTo(Swipe)

module.exports = {
    User,
    Swipe,
    Note,
    Restaurant,
    FavoritePlaces,
    Address,
    Dish,
    Menu,
    Foodproperty,
    Visit_restaurant,
    SwipeFoodproperty
}