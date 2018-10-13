
const {MongoClient, ObjectID} = require('mongodb');

var uri = "mongodb+srv://amirstep:7orion!@cluster0-c8f1h.mongodb.net/TodoApp?retryWrites=true/test";
MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
  if (err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').find({
  //     _id: new ObjectID('5bbffe011c9d44000093c949')
  //   }).toArray().then((docs) => {
  //     console.log('Todos');
  //     console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });//.then(client.close());

  // db.collection('Todos').find().count().then((count) => {
  //     console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });//.then(client.close());

  db.collection('Users').find({
      name: 'Ada T'
    }).toArray().then((docs) => {
      console.log('Todos');
      console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });//.then(client.close());

   client.close();
});
