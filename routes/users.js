import express from 'express'
import { createuser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.post('/', createuser)

// router.get('/checkauthentication', verifyToken, (req, res) => {
//     res.send("Hello user you are logged in!")
// })

// router.get('/checkuser/:id', verifyUser, (req, res) => {
//     res.send("Hello user you are logged in and you can delete your account!")
// })

// router.get('/checkadmin/:id', verifyAdmin, (req, res) => {
//     res.send("Hello Admin you are logged in and you can delete all accounts!")
// })

router.put('/:id', verifyUser, updateUser)
router.delete('/:id', verifyUser, deleteUser)
router.get('/:id', verifyUser, getUser)
router.get("/", verifyAdmin, getUsers)

export default router