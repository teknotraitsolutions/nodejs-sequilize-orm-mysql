
module.exports = (sequelize, DataTypes)=>{
    const Branch = sequelize.define(
        'Branch', {
            branch_id :{
                type: DataTypes.NUMBER(20),
                allowNull : false,
                primaryKey: true,
                autoIncrement:true,
                field:'branch_id'
            },
            name :{
                type : DataTypes.STRING(45),
                allowNull:false,
                primaryKey:false,
                field: 'name'
            },            
            capacity :{
                type : DataTypes.NUMBER(10),
                allowNull:false,
                primaryKey:false,
                field: 'capacity'
            }           
        },{
            timestamps: false,
            tableName:'branches'
        }
    );
    return Branch;
}