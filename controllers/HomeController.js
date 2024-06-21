const {Users,Conversation,Room} = require('../models')

Users.hasOne(Conversation)
Conversation.belongsTo(Users)

const conversation = async(req,res) =>{
    const me = req.user

    const data = await Conversation.findAll({ 
        include: Users,
        where:{receiver_id : me.id },
        order:[['modif','DESC']]
    })
    return res.render('conversation',{me , data })
}

const room = async(req,res)=>{

    const someoneId = req.params.id
    const roomName = req.params.roomname

    const user = await Users.findOne({where:{id:someoneId}})

    const messages = await Room.findAll({where:{roomname:roomName}})

    return res.render('room',{user , roomName, me:req.user,messages})
}

const startConversation = async(req,res)=>{

    const me = req.user 
    const allUsers = await Users.findAll()
    const conversationWithMe = await Conversation.findAll({where:{receiver_id : me.id }})
    let blacklist = [me.id]

    for(person of conversationWithMe)
        blacklist.push(person.UserId)

    let realData = allUsers.filter((value,index) =>{
        if(!blacklist.includes(value.id)){
            return true
        }
    })

    return res.render('start',{realData})
}


const newconversation = async(req,res)=>{

    //UserId,receiverId,message,room
    //1        2         hello   1234
    //2        1         hello   1234
    const someoneId = req.params.id//id anilay olona miresaka amiko
    const myId = req.user.id
    const roomName = Date.now()
    
    function today(){
        const date = new Date()

        let mois = date.getMonth()
        let jour = date.getDay()
        let annee = date.getFullYear()

        let heure = date.getHours()
        let min = date.getMinutes()
        let second = date.getSeconds()

        return `${mois}-${jour}-${annee} ${heure}:${min}:${second}`
    }

    const firstRow = Conversation.build({
        UserId:someoneId,
        receiver_id:myId,
        room:roomName,
        message:'Say Hello',
        modif:today()
    })
    const secondRow = Conversation.build({
        UserId:myId,
        receiver_id:someoneId,
        room:roomName,
        message:'Say Hello',
        modif:today()
        
    })
    await firstRow.save()
    await secondRow.save()

    return res.redirect(`/room/${someoneId}/${roomName}`)

    

}
module.exports = {conversation , room , startConversation,newconversation}
