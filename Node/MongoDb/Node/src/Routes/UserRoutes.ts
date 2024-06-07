import { DetailUser, SignIn, SignUp, UpdateUser, getItems } from "../Controller/UserController";

const express = require('express');
const router = express.Router();


router.get('/details', getItems);
//router.post('/my-details',seetItems);
//router.post('/sign-up', signup);
router.post('/sign-up-ts', SignUp);
router.post('/sign-in', SignIn);
router.post('/updateuser', UpdateUser);
router.post('/detailuser', DetailUser);
//router.post('/deleteuser', DeleteUser);

export default router;

