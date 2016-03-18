var User = require('../../../api/user/user.model.js');

describe('user model', function () {

  describe('must not save if', function () {

    it('some of required field is missing', function (done) {
      var model = new User({});

      model.validate(function (err) {
        expect(err.errors['email']).toBeDefined();
        expect(err.errors['passwordHash']).toBeDefined();
        expect(err.errors['salt']).toBeDefined();
        expect(err.errors['name.first']).toBeDefined();
        expect(err.errors['name.last']).toBeDefined();
        done();
      });
    });

    it('role is nit exist', function (done) {
      var user = new User({ role: -1 });

      user.validate(function (err) {
        expect(err.errors['role']).toBeDefined();
        done();
      });
    });

  });

});