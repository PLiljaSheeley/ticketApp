var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ticketApp');

router.get('/', function(req, res) {
  var myPath = path.join(__dirname + '/../public/views/index.html')
  res.sendFile(myPath);
})

router.get('/ticket', function(request, response, next){
   return Ticket.find({}).exec(function(err, ticket){
       if(err) throw new Error(err);
       response.send(JSON.stringify(ticket));
       next();
   });
});
router.put('/change/:id', function(request, response, next){
    Ticket.findById({_id: request.params.id}, function(err, Ticket) {
      if(Ticket){
    Ticket.name = request.body.name;
    Ticket.type = request.body.type;
    Ticket.priority = request.body.priority;
    Ticket.description = request.body.description;
    Ticket.assignee = request.body.assignee;
    Ticket.reporter = request.body.reporter;
    Ticket.dateUpdated = new Date();
  }
    Ticket.save();
    if(err) console.log('error', err);
         response.send(Ticket.toJSON());
         next();
     });
  });
router.post('/add', function(request, response, next){
   var ticketRequest = new Ticket({name: request.body.name,
    type:request.body.type,
    priority:request.body.priority,
    description:request.body.description,
    assignee:request.body.assignee,
    reporter:request.body.reporter,
    dateCreated:new Date(),
    dateUpdated:new Date()});
      ticketRequest.save(function(err){
         if(err) console.log('error', err);
         response.send(ticketRequest.toJSON());
         next();
     });
});

router.delete("/deleteTicket/:id", function(request, response) {
  console.log("delete id", request.params.id);
  console.log("request", request);
  Ticket.findOneAndRemove({_id: request.params.id}, function(err, person){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      console.log('Deleted user:', person);
      response.sendStatus(200);
    }
  });
});


var Ticket = mongoose.model('Ticket', {name:String,
type:String,
priority:String,
description:String,
assignee:String,
reporter:String,
dateCreated:Date,
dateUpdated:Date});
module.exports = router;