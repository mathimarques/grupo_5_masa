module.exports = (sequelize, dataTypes)=>{
    let alias = 'Type'; //singular o plural?

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(90),
            allowNull: false
        }
    }

    let config = {
        tableName: "types",
        timestamp: false
    }

    let Type = sequelize.define(alias, cols, config);

    // Associate
    Type.associate = function(models){
        Type.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'id_product',
            timestamp: false
        })
    }
    

    return Type;
};