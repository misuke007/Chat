module.exports = (sequelize, datatype)  =>{
    return sequelize.define('Users' , {
        id:{
            primaryKey:true,
            autoIncrement:true,
            type:datatype.INTEGER
        },
        fullname:{
            type:datatype.STRING,
            allowNull:false
        },
        email:{
            type:datatype.STRING,
            allowNull:false
        },
        password:{
            type:datatype.STRING,
            allowNull:false
        },
        profil:{
            type:datatype.STRING,
            allowNull:false
        }
    })
}