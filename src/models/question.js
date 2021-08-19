
module.exports = (sequelize, DataTypes)=>{
    const Question = sequelize.define(
        'Question', {
            ques_id :{
                type: DataTypes.NUMBER(20),
                allowNull : false,
                primaryKey: true,
                autoIncrement:true,
                field:'ques_id'
            },
            title :{
                type : DataTypes.STRING(75),
                allowNull:false,
                primaryKey:false,
                field: 'title'
            },
            type :{
                type : DataTypes.STRING(70),
                allowNull:false,
                primaryKey:false,
                field: 'type'
            },
            marks :{
                type : DataTypes.NUMBER(10),
                allowNull:false,
                primaryKey:false,
                field: 'marks'
            },            
        },{
            timestamps: false,
            tableName:'questions'
        }
    );
    return Question;
}