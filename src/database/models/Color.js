module.exports = (sequelize, dataTypes)=>{
    let alias = 'Color'; //singular o plural?

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    }

    let config = {
        tableName: "colors",
        timestamp: false
    }

    let Color = sequelize.define(alias, cols, config);

    // Associate
    Color.associate = function(models){
        Color.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'id_color',
            timestamp: false
        })
    }
    

    return Color;
};