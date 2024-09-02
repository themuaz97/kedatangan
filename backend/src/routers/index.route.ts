import express from 'express';
import { getUsers } from '../controllers/users.controller.js';
import { addCompany, addDepartment, addPosition, addPositionLevel, addRole, deleteCompany, deleteDepartment, deletePosition, deletePositionLevel, deleteRole, getcompanies, getCompanyById, getDepartmentById, getDepartments, getPositionById, getPositionLevelById, getPositionLevels, getPositions, getRoles, getRolesById, updateCompany, updateDepartment, updatePosition, updatePositionLevel, updateRole } from '../controllers/configuration.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protectRoute);

router.get('/users', getUsers);

// configurations routes
router.get('/roles', getRoles)
router.get('/roles/:id/view', getRolesById)
router.post('/roles/add', addRole)
router.put('/roles/update', updateRole)
router.put('/roles/delete', deleteRole)

router.get('/companies', getcompanies)
router.get('/company/:id/view', getCompanyById)
router.post('/company/add', addCompany)
router.put('/company/update', updateCompany)
router.put('/company/delete', deleteCompany)

router.get('/departments', getDepartments)
router.get('/department/:id/view', getDepartmentById)
router.post('/department/add', addDepartment)
router.put('/department/update', updateDepartment)
router.put('/department/delete', deleteDepartment)

router.get('/positions', getPositions)
router.get('/position/:id/view', getPositionById)
router.post('/position/add', addPosition)
router.put('/position/update', updatePosition)
router.put('/position/delete', deletePosition)

router.get('/position-levels', getPositionLevels)
router.get('/position-levels/:id/view', getPositionLevelById)
router.post('/position-levels/add', addPositionLevel)
router.put('/position-levels/update', updatePositionLevel)
router.put('/position-levels/delete', deletePositionLevel)

export { router as indexRouter }