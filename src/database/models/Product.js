module.exports = (sequelize, dataTypes)=>{
    let alias = 'Product'; //singular o plural?

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        model: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        id_type: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        id_brand: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        id_color: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        imagen: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: true
        }
    }

    let config = {
        tableName: "products",
        timestamp: false
    }

    let Product = sequelize.define(alias, cols, config);

    // Associate
    Product.associate = function(models){
        Product.belongsTo(models.Type, {
            as: 'type',
            foreignKey: 'id_type',
            timestamp: false
        })

        Product.belongsTo(models.Brand, {
            as: 'brand',
            foreignKey: 'id_brand',
            timestamp: false
        })

        Product.belongsTo(models.Color, {
            as: 'color',
            foreignKey: 'id_color',
            timestamp: false
        })

        Product.belongsToMany(models.User, {
            as: 'user',
            through: 'product_user',
            foreignKey: 'id_product',
            otherKey: 'id_user'
        })
    }

    return Product;
};