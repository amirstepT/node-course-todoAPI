
const {MongoClient, ObjectID} = require('mongodb');

var uri = "mongodb+srv://amirstep:7orion!@cluster0-c8f1h.mongodb.net/TodoApp?retryWrites=true/test";
MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
  if (err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  //deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

   db.collection('Users').deleteMany({name: 'Ada T'}).then((result) => {
     console.log(result);
     console.log('\n yo yo \n')
  });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  console.log('When will this fire?');

  //fineOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5bbff8783f8dfd03cfc64991')}).then((result) => {
    console.log(result);
  });

  //client.close();
});
