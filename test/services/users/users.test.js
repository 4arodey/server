const assert = require('assert');

const usersService = require('../../../services/users/users.service');


/*describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});*/

// describe('user-service', () => {
//   describe('findById', () => {
//     it('validId_returnUser', () => {
//       assert.equal(10, 10);
//     });
//   });
// });



  describe('user-service', () => {
    describe('findById', () => {
      it('validId_returnUser', () => {
        const ser = usersService;


        const res = usersService.findById(1);

        assert(res, expectedResult);

      });
    });
  });

module.exports = sendTests;
