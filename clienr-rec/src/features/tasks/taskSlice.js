import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTasksApi,
  addTaskApi,
  updateTaskApi,
  deleteTaskApi,
} from "../../api/api"; // adjust path if needed

// Fetch tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      return await fetchTasksApi(auth.token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add task
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      return await addTaskApi(auth.token, task);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updates }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      return await updateTaskApi(auth.token, id, updates);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ taskId, token }, { rejectWithValue }) => {
    try {
      await deleteTaskApi(token, taskId); // ✅ helper ka use
      return taskId; // backend delete confirm
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// ===== Slice =====
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    filter: "all", // ✅ important
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch tasks
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add task
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });

    // Update task
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    });

    // Delete task
   
  builder.addCase(deleteTask.fulfilled, (state, action) => {
    state.tasks = state.tasks.filter((task) => task.id !== action.payload);
  });
  builder
  .addCase(deleteTask.rejected, (state, action) => {
    state.error = action.payload; // ya toast/show message
  });

  },
});

export const { setFilter } = taskSlice.actions; // ✅ ab available hoga
export default taskSlice.reducer;