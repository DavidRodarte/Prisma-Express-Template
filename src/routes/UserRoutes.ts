import { Router} from 'express'
import { UserController } from '../controllers/UserController'

const router = Router()

router.get('/', UserController.index)
router.get('/:id', UserController.getUser)
router.post('/', UserController.createUser)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

export default router
