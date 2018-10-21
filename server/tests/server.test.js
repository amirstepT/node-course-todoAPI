const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo'); //ES 6 destructuring
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('Should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          Todo.find({text}).then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((e) => done(e));
        }
      });
  });

  it('Should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          Todo.find().then((todos) => {
            expect(todos.length).toBe(2);
            done();
          }).catch((e) => done(e));
        }
      });
  });

});


describe('GET /todos', () => {
  it('Should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
});


describe('GET /todos/:id', () => {
  it('Should return todo doc', (done) => {
    request(app)
      .get('/todos/' + todos[0]._id.toHexString())
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('Should return a 404 if todo not found', (done) => {
    request(app)
      .get('/todos/' + new ObjectID().toHexString())
      .expect(404)
      .end(done);
  });

  it('Should return a 404 if todo is not valid', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });

});

describe('DELETE /todos/:id', () => {
  it('Should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();
      request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
          if (err) return done(err);
          else {
            Todo.findById(hexId).then((todo) => {
              expect(todo).toNotExist();
              done();
            }).catch((e) => done(e));
          }
        });
    });

    it('Should return 404 if todo not found', (done) => {
      request(app)
        .delete('/todos/' + new ObjectID().toHexString())
        .expect(404)
        .end(done);
    });

    it('Should return a 404 if todo is not valid', (done) => {
      request(app)
        .delete('/todos/123')
        .expect(404)
        .end(done);
    });
  });

  describe('PATCH /todos/:id', () => {
    it('Should update the todo', (done) => {
      var hexId = todos[0]._id.toHexString();

      todos[0].text = 'First test todo updated';
      todos[0].completed = true;

      request(app)
        .patch(`/todos/${hexId}`)
        .send(todos[0])
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
          expect(res.body.todo.completed).toBe(true);
          expect(res.body.todo.completedAt).toBeA('number');
        }).end(done);
    });

    it('Should clear completedAt when todo is not completed', (done) => {
      var hexId = todos[1]._id.toHexString();
      var tempTodo = {
        text: 'Second test todo updated',
        completed: false
      };

      request(app)
        .patch(`/todos/${hexId}`)
        .send(tempTodo)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(tempTodo.text);
          expect(res.body.todo.completed).toBe(false);
          expect(res.body.todo.completedAt).toBe(null); // or toNotExist();
        }).end(done);
    });
});


describe('GET /users/me', () => {
  it('Should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toBe(users[0].email);
        expect(res.body._id).toBe(users[0]._id.toHexString());
      })
      .end(done);
  });

  it('Should return a 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});


describe('POST /users', () => {
  it('Should create a user', (done) => {
    var newId;
    var email = 'amirst@yahoo.com';
    var password = '777889h';
    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        newId = res.body._id;
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) return done(err);

        User.findById(newId).then((doc) => {
          expect(doc.email).toBe(email);
          expect(doc.password).toNotBe(password);
          expect(doc.tokens[0].token).toExist();
          done();
        });
      });
  });

  it('Should return validation errors if request invalid', (done) => {
    var email = 'amirstyahoo.com';
    var password = '7778';
    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end(done);
  });

  it('Should not create user if email in use', (done) => {
    var email = 'andrew@example.com';
    var password = '88jjfjksjd';
    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end(done);
  });
});
