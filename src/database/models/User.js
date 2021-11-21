module.exports = (sequelize, dataTypes)=>{
    let alias = 'User'; //singular o plural?

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(80),
            allowNull: false
        },
        username: {
            type: dataTypes.STRING(80),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        address: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        id_role: {
            type: dataTypes.INTEGER,
            allowNull: true
        }
    }

    let config = {
        tableName: "users",
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config);

    // Associate
    User.associate = function(models){
        User.belongsTo(models.Role, {
            as: 'role',
            foreignKey: 'id_role',
            timestamps: false
        })

        User.belongsToMany(models.Product, {
            as: 'product',
            through: 'product_user',
            foreignKey: 'id_user',
            otherKey: 'id_product',
            timestamps: false
        })

        User.hasMany(models.Order, {
            as: 'order',
            foreignKey: 'id_user',
            timestamps: false
        })
    }

    return User;
};