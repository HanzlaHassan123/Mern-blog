import express from 'express'
import { updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';
import { deleteUser } from '../controllers/user.controller.js';
const router =express.Router();
console.log('in userRoute')
router.put('/update/:userId',verifyUser,updateUser)
router.delete('/delete/:userId',verifyUser,deleteUser);
export default router

