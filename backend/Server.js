import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/db/index.js';
import todosroutes from './src/routes/todos.routes.js'
import {addTodo ,  editTodos, getalltodos } from './src/controllers/todos.controller.js';
dotenv.config();


const app = express();
app.use(express.json());

app.get('/api/v1' , getalltodos );
app.get('/api/v1' , addTodo);
app.get('/api/v1' , editTodos );



connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });