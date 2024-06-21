const express = require('express')
const { ensureAuthenticated } = require('../config/security')
const { conversation, room, startConversation ,newconversation} = require('../controllers/HomeController')

const router = express.Router()

router.get('/conversation' ,ensureAuthenticated, conversation)
router.get('/room/:id/:roomname' ,ensureAuthenticated, room)
router.get('/start-conversation' ,ensureAuthenticated, startConversation)
router.get('/start/:id' , ensureAuthenticated,newconversation)

module.exports = router