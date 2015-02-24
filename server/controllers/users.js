// require mongo models and use schema created in server/models
var mongoose= require('mongoose'),
    User    = mongoose.model('User'),
    session = require('express-session'),
    crypto  = require('crypto'),
    auth    = require('basic-auth');

//controller methods based on routes.js
module.exports = {
	// load INDEX.EJS and use MAIN PARTIAL
	index: function(req, res){
        res.render('pages/index');
	},
    joined: function(req, res){
        res.render('pages/index', { user_id: req.session.user_id, username: req.session.username });
    },
    // #C in CRUD Add new data START -->
    create: function(req, res, callback){ 
            var data = req.body;
            User.findOne({username: data.name}, function (err, user){
            
                cipher = crypto.createCipher('aes-256-cbc', 'salt');
                cipher.update(data.pass, 'utf8', 'base64');
                encryptedPassword = cipher.final('base64');
                
                if(user){                                               //user exists
                    if(user.password == encryptedPassword)
                    {
                        callback(user._id, data.name);
                        var info = { username: data.name, user_id: user._id };
                        res.send(info);
                    }
                } else {                                                //user does not exist
                    dbReady = { username: data.name, password: encryptedPassword }
                    var a = new User(dbReady);
                    a.save(function (err, created) {
                        if(err){
                            res.send("save Error" + err);
                        }
                        else{
                            callback(created._id, data.name);
                            var info = { username: data.name, user_id: created._id };
                            res.send(info);
                        }
                    });  
                }
            })                                        
    },
    validate: function(data, callback){
        
    }
    // <--- END new data
};