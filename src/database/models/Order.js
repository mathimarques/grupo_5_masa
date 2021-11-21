module.exports = (sequelize, dataTypes)=>{
    let alias = 'Order'; //singular o plural?

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        total_price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        date_of_order: {
            type: dataTypes.DATETIME,
            allowNull: false
        }
        
    }

    let config = {
        tableName: "order",
        timestamps: false
    }

    let Order = sequelize.define(alias, cols, config);

    // Associate
    Order.associate = function(models){
        Order.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'id_user',
            timestamps: false
        })

        Order.belongsToMany(models.Product, {
            as: 'product',
            through: 'product_order',
            foreignKey: 'id_order',
            otherKey: 'id_product',
            timestamps: false
        })
    }

    return Order;
};