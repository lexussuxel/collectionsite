const sequelize = require("../db");

const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: DataTypes.STRING,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
    },
    role:{
        type: DataTypes.STRING,
        defaultValue: 'USER'
    }
})

const Collection = sequelize.define('collection', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.TEXT
    }
})

const Item = sequelize.define('item', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        unique: true
    },
    description:{
        type: DataTypes.TEXT
    },
    img:{
        type: DataTypes.STRING
    }
})

const Comment = sequelize.define('comment', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.TEXT
    }
})

const Like = sequelize.define('like', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

const Tag = sequelize.define('tag', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING
    }
})

const TagItem = sequelize.define('tagItem', {
    id:{
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true
    }
})

User.hasMany(Collection)
Collection.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

User.hasMany(Like)
Like.belongsTo(User)

Collection.hasMany(Item)
Item.belongsTo(User)

Tag.belongsToMany(Item, {through: TagItem})
Item.belongsToMany(Tag, {through: TagItem})

module.exports = {
    User,
    Collection,
    Like,
    Comment,
    Item,
    Tag
}