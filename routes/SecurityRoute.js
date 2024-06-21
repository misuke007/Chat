const express =require('express')
const { ensureNonAuthenticated } = require('../config/security')
const { login, register, postregister, postlogin } = require('../controllers/SecurityController')

const router = express.Router()

router.get('/' ,ensureNonAuthenticated,login)
router.post('/' , ensureNonAuthenticated,postlogin)
router.get('/register' ,ensureNonAuthenticated,register)
router.post('/register' ,ensureNonAuthenticated,postregister)
router.get('/logout' , (req,res) =>{
    req.logout(error => {
        if(error){
            console.log(error);

        }else{
            
            req.flash('success' ,'vous etes deconnecter')

            return res.redirect('/')
        }
    })

   
})

module.exports = router