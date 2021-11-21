module.exports = (sequelize, dataTypes)=>{
    let alias = 'Brand'; //singular o plural?

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    }

    let config = {
        tableName: "brands",
        timestamp: false
    }

    let Brand = sequelize.define(alias, cols, config);

    // Associate
    Brand.associate = function(models){
        Brand.hasMany(models.Product, {
            as: 'product', //estamos llamando a varias asociaciones de la misma manera (?)
            foreignKey: 'id_brand',
            timestamp: false
        })
    }
    

    return Brand;
};