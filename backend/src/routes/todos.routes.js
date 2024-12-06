import mongoose from "mongoose";
import express from 'express';

import {addTodo , editTodos, getalltodos} from '../controllers/todos.controller.js'

const router = express.Router();

router.post('/todo' , addTodo);
router.get('/todos' , getalltodos);
router.put('/edittodo/:id', editTodos);

export default router;