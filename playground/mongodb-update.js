
const {MongoClient, ObjectID} = require('mongodb');

var uri = "mongodb+srv://amirstep:7orion!@cluster0-c8f1h.mongodb.net/TodoApp?retryWrites=true/test";
MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
  if (err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5bc09a57eecfb9351bf96751')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    name: "John"
  }, {
    $set: {
      name: 'Amir'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  //client.close();
});
