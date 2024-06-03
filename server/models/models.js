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
    tag: {type: DataTypes.STRING},
    choseIdDish: {type: DataTypes.INTEGER}
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
    rating: {type: DataTypes.DOUBLE(2, 2)},
    properties: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING}
})

const FavoritePlaces = sequelize.define('FavoritePlaces', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Address = sequelize.define('Address', {
    idAddress: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    locationLongtitude: {type: DataTypes.DOUBLE(9,10)},
    locationLatitude: {type: DataTypes.DOUBLE(9,10)},
    address: {type: DataTypes.STRING, unique: true}
})

const Dish = sequelize.define('Dish', {
    idDish: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    dishName: {type: DataTypes.STRING},
    dishSize: {type: DataTypes.STRING},
    dishTag: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    dishPrice: {type: DataTypes.DOUBLE(5,3)},
    dishRating: {type: DataTypes.DOUBLE(2,2)},
    ratesNumber: {type: DataTypes.INTEGER}
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

Restaurant.hasMany(Dish)
Dish.belongsTo(Restaurant)

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
    Foodproperty,
    Visit_restaurant,
    SwipeFoodproperty
}