const express = require('express');
const bodyParser = require('body-parser');

const app = express();
console.log(__dirname);
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

router.route('/users').get(function(req, res){        
    res.json({users: chatters});
});

router.route('/userLogged').get(function(req, res){

});

router.route('/chats').get(function(req, res){

});

router.route('/login').post(function(req, res){
    console.log(req);
    chatters.push({name: req.body.name, gravatar: "https://www.gravatar.com/avatar/9a122f0ee7ccdf36e46843a045a34ac8"});   
});

router.route('/chat').post(function(req, res){

});

router.route('/logout').post(function(req, res){

});


app.use('/api', router);

app.listen(3000, function(){
    console.log('web server is running on port 3000');
})
