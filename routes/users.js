const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authentication.js');
const {
  login,
  logout,
  userUpdateProfile,
  userDelete,
  userProfileGet,
  userRegister,
  allUsers,
  getUserById,
  userRoleUpdate,
} = require('../controllers/usersController.js');

router.route('/').post(userRegister).get(protect, admin, allUsers);
router.post('/login', login);
//NOTE
router.get('/logout', logout);
router
  .route('/profile')
  .get(protect, userProfileGet)
  .put(protect, userUpdateProfile);
router
  .route('/:id')
  .delete(protect, admin, userDelete)
  .get(protect, admin, getUserById)
  .put(protect, admin, userRoleUpdate);

module.exports = router;

//export default router;

// old code
/*
// show users
router.get('/', async (req, res) => {});

// show users by id // Show User profile
router.get('/me', async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

// Register a User
router.post('/register', async (req, res) => {});

// Logging a user
router.post('/login', async (req, res) => {});

// Logout User // NOTE
router.get('/logout', (req, res) => {});

// update User - By user acc
router.post('/update/:id', async (req, res) => {});

// delete user
router.delete('/:id', async (req, res) => {});

module.exports = router;
*/
