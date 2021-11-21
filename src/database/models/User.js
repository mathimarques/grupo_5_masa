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
        }
    }
};