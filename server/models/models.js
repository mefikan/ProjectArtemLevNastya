const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const users = sequelize.define('users', {
    idUser: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const swipes = sequelize.define('swipes', {
    idswipes: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tag: {type: DataTypes.STRING},
    boolArray: {type: DataTypes.STRING},
})

const note = sequelize.define('note', {
    idNote: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING},
    title: {type: DataTypes.STRING},
    date: {type: DataTypes.DATE},
})

const restaurant = sequelize.define('restaurant', {
    idRestaurant: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true,},
    rating: {type: DataTypes.INTEGER},
    properties: {type: DataTypes.STRING},
})

const favoritePlaces = sequelize.define('favoritePlaces', {

})

const address = sequelize.define('address', {
    idAddress: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    locationLongtitude: {type: DataTypes.DECIMAL(9)},
    locationLatitude: {type: DataTypes.DECIMAL(9)},
    address: {type: DataTypes.STRING, unique: true,},
})

const weight = sequelize.define('weight', {
    idWeight: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    weight: {type: DataTypes.INTEGER},
})

const dish = sequelize.define('dish', {
    idDish: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    dishName: {type: DataTypes.STRING},
})

const menu = sequelize.define('menu', {
    dishPrice: {type: DataTypes.STRING},
})

const foodproperty = sequelize.define('foodproperty', {
    idfoodproperty: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    propertyname: {type: DataTypes.STRING},
})

const visit_restaurant = sequelize.define('visit_restaurant', {
    idVisit: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE},
    review: {type: DataTypes.STRING},
    visitCount: {type: DataTypes.INTEGER},
    Rate: {type: DataTypes.INTEGER},
    visit_restaurantcol: {type: DataTypes.STRING},
})

users.hasMany(swipes)
swipes.belongsTo(users)

users.hasMany(note)
note.belongsTo(users)

users.belongsToMany(restaurant, {through: favoritePlaces})
restaurant.belongsToMany(users, {through: favoritePlaces})

users.hasMany(visit_restaurant)
visit_restaurant.belongsTo(users)

restaurant.hasMany(visit_restaurant)
visit_restaurant.belongsTo(restaurant)

restaurant.hasOne(address)
address.belongsTo(restaurant)

restaurant.hasOne(menu)
menu.belongsTo(restaurant)

dish.hasMany(menu)
menu.belongsTo(dish)

dish.hasOne(foodproperty)
foodproperty.belongsTo(dish)

weight.hasMany(dish)
dish.belongsTo(weight)


module.exports = {
    users,
    swipes,
    note,
    restaurant,
    favoritePlaces,
    address,
    weight,
    dish,
    menu,
    foodproperty,
    visit_restaurant
}