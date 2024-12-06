import Todos from "../models/todos.model.js";

export const addTodo = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required.",
    });
  }

  try {
    const todo = await Todos.create({ title, description });
    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create todo",
      error: err.message,
    });
  }
};

// Get All Todos
export const getalltodos = async (req, res) => {
  try {
    const todos = await Todos.find();
    res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch todos",
      error: error.message,
    });
  }
};

// Edit a Todo
export const editTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Validate ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const updatedTodo = await Todos.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update todo",
      error: error.message,
    });
  }
};
