module.exports = (sequelize, datatype)  =>{
    
    return sequelize.define('Conversation' , {

        id:{
            primaryKey:true,
            autoIncrement:true,
            type:datatype.INTEGER
        },
        UserId:{
            type:datatype.INTEGER,
            allowNull:false
        },
       receiver_id:{
            type:datatype.INTEGER,
            allowNull:false
        },
        message:{
            type:datatype.TEXT,
            allowNull:false
        },
        room:{
            type:datatype.STRING,
            allowNull:false
        },
        vu:{
            type:datatype.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        modif:{
            type:datatype.DATE,
            allowNull:false,
        },
    })
}