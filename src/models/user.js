//const { Sequelize, DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define(
        'User', {
            id :{
                type: DataTypes.NUMBER(20),
                allowNull : false,
                primaryKey: true,
                autoIncrement:true,
                field:'id'
            },
            name :{
                type : DataTypes.STRING(45),
                allowNull:false,
                primaryKey:false,
                field: 'name'
            },
            email :{
                type : DataTypes.STRING(45),
                allowNull:false,
                primaryKey:false,
                field: 'email'
            },
            first_name :{
                type : DataTypes.STRING(100),
                allowNull:false,
                primaryKey:false,
                field: 'first_name'
            },
            last_name :{
                type : DataTypes.STRING(100),
                allowNull:false,
                primaryKey:false,
                field: 'last_name'
            },
            role_id :{
                type : DataTypes.NUMBER(10),
                allowNull:false,
                primaryKey:false,
                field: 'role_id'
            },
            password :{
                type : DataTypes.STRING(150),
                allowNull:false,
                primaryKey:false,
                field: 'password'
            }
        },{
            timestamps: false,
            tableName:'users'
        }
    );
    return User;
}