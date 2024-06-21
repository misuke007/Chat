module.exports = (sequelize, datatype)  =>{
    return sequelize.define('Room' , {
        id:{
            primaryKey:true,
            autoIncrement:true,
            type:datatype.INTEGER
        },
        roomname:{
            type:datatype.STRING,
            allowNull:false
        },
        message:{
            type:datatype.TEXT,
            allowNull:false
        },
        sender_id:{
            type:datatype.INTEGER,
            allowNull:false
        }
    })
}