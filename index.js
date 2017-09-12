const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/js', express.static(__dirname + '/node_modules/jscrollpane/'));
app.use('/css', express.static(__dirname + '/css/'));
app.use('/script', express.static(__dirname + '/script/'));
app.use('/img', express.static(__dirname + '/img/'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const router = express.Router();
router.get('/', function(req, res){
    res.json({message: 'welcome from api'});

});

let chatters = [];
let chats = [];
let chatid = 0;
router.route('/users').get(function(req, res){        
    res.json({users: chatters, total: chatters.length});
});

router.route('/userLogged').get(function(req, res){

});

router.route('/chats').get(function(req, res){
    res.json({chats: chats});
});

router.route('/login').post(function(req, res){    
    let user = {name: req.body.name, gravatar: "https://www.gravatar.com/avatar/9a122f0ee7ccdf36e46843a045a34ac8"};
    chatters.push(user);   
    res.json(user);
});

router.route('/chat').post(function(req, res){
    console.log("inside chat");
    console.log(req.body);
    let date = new Date();
    chats.push({
        name:req.body.author, 
        text: req.body.chatText, 
        id: chatid, time: { hours: date.getHours(),minutes: date.getMinutes()}});
    res.json({status: 1, insertID: chatid++});
});

router.route('/logout').post(function(req, res){
    chatters = chatters.filter(c=> c.name != req.body.name);
    res.json();
});


app.use('/api', router);

app.listen(3000, function(){
    console.log('web server is running on port 3000');
})
