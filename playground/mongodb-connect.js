//const MongoClient = require('mongodb').MongoClient;
//const {MongoClient} = require('mongodb'); // this code is identical to the code above

// const mong = require('mongodb');  // these 3 lines of code are identical to those below
// const MongoClient = mong.MongoClient;
// var obj = new mong.ObjectID();

const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// var user = {name: 'Amir', age: 25};
// var {name} = user;
// console.log(name);

var uri = "mongodb+srv://amirstep:7orion!@cluster0-c8f1h.mongodb.net/TodoApp?retryWrites=true/test";
MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
  if (err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');
   // const collection = client.db("test").collection("devices");
   // perform actions on the collection object

   db.collection('Todos').insertOne({
     text: 'Eat lunch',
     completed: false
   }, (err, result) => {
     if (err) return console.log('Unable to insert todo', err);
     console.log(JSON.stringify(result.ops, undefined, 2));
   });

   // db.collection('Users').insertOne({
   //   name: 'Ada T',
   //   age: 2,
   //   location: 'Philadelphia'
   // }, (err, result) => {
   //   if (err) return console.log('Unable to insert todo', err);
   //   console.log(result.ops[0]._id.getTimestamp());
   // });

   client.close();
});
