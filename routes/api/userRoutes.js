const router = require('express').Router();
const c = require('../../controller/userController');

router.route('/')
  .get(c.findAllUsers)
  .post(c.createUser)

router.route('/:id')
  .get(c.findOneUser)
  .put(c.updateUser)
  .delete(c.deleteUser)

router.route('/:id/friends/:friendId')
  .post(c.addFriend)

module.exports = router;