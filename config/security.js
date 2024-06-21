//gerer autorisation
const {Users} = require('../models')
const ensureAuthenticated = (req ,res , next)=>{

    //req = connection info(stocker ao anaty req http)
    //req.isAuthenticated() return boolean
    if(req.isAuthenticated()){
        next()
    }else{
        req.flash('error','you need login first')
        return res.redirect('/')
    }
}


const ensureNonAuthenticated = (req ,res , next)=>{
    if(req.isAuthenticated()){
        return res.redirect('/conversation')
    }else{
        next()
    }
}

module.exports={ensureAuthenticated ,ensureNonAuthenticated}