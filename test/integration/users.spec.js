const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../../src');

const request = supertest(app);

describe('Routes Users', () => {
  const { Users } = app.datasource.models;
  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'test@email.com',
    password: 'test',
  };

  before(() => Users.findAll());

  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create(defaultUser))
      .then(() => {
        done();
      });
  });

  describe('Route GET /users', () => {
    it('should return a list of users', (done) => {
      request
        .get('/users')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultUser.id);
          expect(res.body[0].name).to.be.eql(defaultUser.name);
          expect(res.body[0].email).to.be.eql(defaultUser.email);
          // expect(res.body[0].password).to.be.eql(defaultUser.password);

          done(err);
        });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('should return a users', (done) => {
      request
        .get('/users/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultUser.id);
          expect(res.body.name).to.be.eql(defaultUser.name);
          expect(res.body.email).to.be.eql(defaultUser.email);
          // expect(res.body.password).to.be.eql(defaultUser.password);

          done(err);
        });
    });
  });

  describe('Route POST /users', () => {
    it('should create a user', (done) => {
      const newUser = {
        id: 2,
        name: 'New User',
        email: 'test@new.tech',
        password: 'newtest',
      };

      request
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          const { user } = res.body;
          expect(user.id).to.be.eql(newUser.id);
          expect(user.name).to.be.eql(newUser.name);
          expect(user.email).to.be.eql(newUser.email);
          // expect(res.body.password).to.be.eql(defaultUser.password);

          done(err);
        });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('should update a user', (done) => {
      const updatedUser = {
        id: 1,
        name: 'New User',
        email: 'test@new.tech',
        password: 'newtest',
      };
      request
        .put('/users/1')
        .send(updatedUser)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);

          done(err);
        });
    });
  });

  describe('Route DELETE /users/{id}', () => {
    it('should delete a user', (done) => {
      request
        .delete('/users/1')
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);

          done(err);
        });
    });
  });
});
