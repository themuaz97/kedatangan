import express from 'express';
import { updateMe } from '../controllers/users.controller.js';
import { addCompany, addDepartment, addPosition, addPositionLevel, addRole, addUser, deleteCompany, deleteDepartment, deletePosition, deletePositionLevel, deleteRole, deleteUser, getcompanies, getCompanyById, getDepartmentById, getDepartments, getPositionById, getPositionLevelById, getPositionLevels, getPositions, getRoles, getRolesById, getUsers, updateCompany, updateDepartment, updatePosition, updatePositionLevel, updateRole, updateUser } from '../controllers/configuration.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protectRoute);

// account routes
router.put('/account/update', updateMe);

// configurations routes
router.get('/roles', getRoles)
router.get('/roles/:id/view', getRolesById)
router.post('/roles/add', addRole)
router.put('/roles/:id/update', updateRole)
router.put('/roles/:id/delete', deleteRole)

router.get('/companies', getcompanies)
router.get('/company/:id/view', getCompanyById)
router.post('/company/add', addCompany)
router.put('/company/:id/update', updateCompany)
router.put('/company/:id/delete', deleteCompany)

router.get('/departments', getDepartments)
router.get('/department/:id/view', getDepartmentById)
router.post('/department/add', addDepartment)
router.put('/department/:id/update', updateDepartment)
router.put('/department/:id/delete', deleteDepartment)

router.get('/positions', getPositions)
router.get('/position/:id/view', getPositionById)
router.post('/position/add', addPosition)
router.put('/position/:id/update', updatePosition)
router.put('/position/:id/delete', deletePosition)

router.get('/position-levels', getPositionLevels)
router.get('/position-levels/:id/view', getPositionLevelById)
router.post('/position-levels/add', addPositionLevel)
router.put('/position-levels/:id/update', updatePositionLevel)
router.put('/position-levels/:id/delete', deletePositionLevel)

router.get('/users', getUsers);
router.post('/user/add', addUser);
router.put('/user/:id/update', updateUser);
router.put('/user/:id/delete', deleteUser);

export { router as indexRouter }