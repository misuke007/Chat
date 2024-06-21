const {Users} = require('../models')
const bcrypt = require('bcryptjs')
const path  = require('path')
const passport = require('passport')

const login = (req,res) =>{
    return res.render('login')
}

const register = (req,res)=>{
    return res.render('register',{error:undefined})
}

const postregister = async(req,res,next)=>{
    
    const{fullname,email,password} = req.body
    const {profil}  =req.files
    let error = null

    const data = await Users.findOne({where:{email}})

    if(data)
        error = 'adresse email deja utilisee'

    if(error == null ) {
        const hashedPassword = bcrypt.hashSync(password,13)
        const ext = path.extname(profil.name)
        const newProfilName = `PROFIL-${Date.now()}${ext}`

        profil.mv(`public/profil/${newProfilName}` , async(error) =>{
            if(error){
                console.log(error);
            }else{
                const newUser = Users.build({
                    fullname,
                    email,
                    password:hashedPassword,
                    profil:newProfilName
                })

                await newUser.save()


                passport.authenticate('local',{
                    successRedirect:'/conversation',
                    failureRedirect:'/',
                    failureFlash:true
                })(req, res, next)
            }
        })

    } else {

        return res.render('register' , {error})
    }   


}
const postlogin = (req,res, next) => {

    passport.authenticate('local',{
        successRedirect:'/conversation',
        failureRedirect:'/',
        failureFlash:true
    })(req, res, next)
}

module.exports = {login,register,postregister,postlogin}