const {Users,Conversation} = require('./models')

const allUsers = await Users.findAll()
const me = req.user
const conversationWithMe = await Conversation.findAll({where:{receiver_id: me.id }}) //olona efa niresaka tamiko

