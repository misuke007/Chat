

const express = require('express')
const layout = require('express-ejs-layouts')
const database = require('./models')
const flash = require('connect-flash')
const upload = require('express-fileupload')
const session = require('express-session')
const passport = require('passport')

require('./config/passport')(passport)

const SecurityRoute = require('./routes/SecurityRoute')
const HomeRoute = require('./routes/HomeRoute')

const {Conversation,Room,Users} = require('./models')

const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')

const io = new Server(server)

app.use(upload())
app.use(layout)
app.set('view engine' , 'ejs')

app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:false}))


app.use(session({
    resave:true,
    secret:'secret',
    saveUninitialized:true
}))

app.use(flash())

app.use((req,res,next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.use(passport.initialize())
app.use(passport.session())

app.use('/' ,SecurityRoute)
app.use('/',HomeRoute)


io.on('connection' ,(socket) =>{

    socket.on('set-vu' , async (room,receiver_id) => {

        await Conversation.update({vu:true} ,{
            where:{
                room,
                UserId:receiver_id,
            }
        })
    })

    socket.on('join-room' , (room,me) => {
        socket.join(room)
        Conversation.update({vu:true} , {where:{room,receiver_id:me}})
    })
    

    socket.on('leave-room' , (room) =>{
        socket.leave(room)
    })

    socket.on('conversation-room' , (room) =>{

        socket.join(room)
        console.log(socket.rooms)
      
    })

    socket.on('send-message' , async(message ,me, receiver_id, room)=> {

        console.log(receiver_id,'------------------------')

        const user = await Users.findOne({where:{id:me}})

        socket.to(`${receiver_id}`).emit('conversation',message,user,room)
      

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

        await Conversation.update({message , vu:true ,modif:today()},{
            where:{room}
        })

        await Conversation.update({vu:false,modif:today()} , {
            where:{
                room:room,
                UserId:me
            }
        })

        const newMessage = Room.build({
            roomname:room,
            message:message,
            sender_id:me

        })
        newMessage.save()
        socket.to(room).emit('private-room' , message)

    })
})

database.sequelize.sync({force:false})
.then(() =>{
    server.listen(5000 , () => console.log(`http://localhost:5000`))
})