import { Router } from 'express';
import {
    createProperty,
    getProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
    getPropertiesByUser
} from '../controllers/propertyController';
import validate from '../middlewares/validate';
import { createPropertySchema, updatePropertySchema, propertyFiltersSchema } from '../validators/propertySchema';
import { protectedRoute } from '../middlewares/authMiddleware';
import parseData from '../middlewares/parseData';
import upload from '../config/multer';


const router = Router();

router.post('/', protectedRoute, upload.array("images", 10), parseData, validate(createPropertySchema), createProperty);
router.get('/', validate(propertyFiltersSchema), getProperties);
router.get('/:id', getPropertyById);
router.patch('/:id', protectedRoute, validate(updatePropertySchema), updateProperty);
router.delete('/:id', protectedRoute, deleteProperty);
router.get('/user/:id', protectedRoute, getPropertiesByUser);
export default router;
