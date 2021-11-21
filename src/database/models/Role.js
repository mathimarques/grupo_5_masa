module.exports = (sequelize, dataTypes)=>{
    let alias = 'Role'; //singular o plural?

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(10),
            allowNull: false
        }
    }

    let config = {
        tableName: "role",
        timestamps: false
    }

    let Role = sequelize.define(alias, cols, config);

    // Associate
    Role.associate = function(models){
        Role.hasMany(models.User, {
            as: 'user',
            foreignKey: 'id_role',
            timestamps: false
        })
    }
    

    return Role;
};