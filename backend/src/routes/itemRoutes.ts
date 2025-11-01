import { Router } from 'express';
import { body } from 'express-validator';
import { createItem, getItems, getItemById, updateItem, deleteItem } from '../controllers/itemController';
import { validateRequest } from '../middleware/validationMiddleware';

const router = Router();

router.route('/')
  .post(
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('description').optional().isString()
    ],
    validateRequest,
    createItem
  )
  .get(getItems);

router.route('/:id')
  .get(getItemById)
  .put(
    [
      body('name').optional().notEmpty().withMessage('Name cannot be empty'),
      body('description').optional().isString()
    ],
    validateRequest,
    updateItem
  )
  .delete(deleteItem);

export default router;
