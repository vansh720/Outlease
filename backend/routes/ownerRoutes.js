import express from 'express'
import { protect } from '../middleware/auth.js'
import { addItem, changeRoleToOwner } from '../controllers/ownerController.js'
import upload from '../middleware/multer.js'

const ownerRouter = express.Router()

ownerRouter.post('/change-role',protect , changeRoleToOwner)
ownerRouter.post('/add-item', upload.single("image") , addItem)

export default ownerRouter