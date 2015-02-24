// require mongo models and use schema created in server/models
var mongoose = require('mongoose'); 
var Chat = mongoose.model('Chat');

//controller methods based on routes.js
module.exports = {
    // #C in CRUD Add new data START -->
    create: function(chatPacket){  
        console.log('got in chat controller')                                                               // create the object to match Question
        var a = new Chat(chatPacket); 
        a.save(function (err, created) {
            if(err){
                console.log("save Error" + err);
             }
             else{
                return created;
             }
        });                                                 
    },
    // <--- END new data
    // #R in CRUD Add new data START -->  
    details: function(req,res){
        Chat.find({room: req.params.room}, function (err, history){
            if(err){
                console.log(err);
            }
            else {
                res.send(history);
            }
        }).limit(15);
    }
};