

//create action Start
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://662215bd27fcd16fa6c8b53f.mockapi.io/crudredux",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//create action End

//read action Start
export const showUser = createAsyncThunk(
  "userDetail/showUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://662215bd27fcd16fa6c8b53f.mockapi.io/crudredux"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//read action End

//delete user Start
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://662215bd27fcd16fa6c8b53f.mockapi.io/crudredux/${id}`,
      {
        method: "DELETE",
      }
    );
    try {
      const result = await response.json();
      console.log("deleteUser", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
//delete user End

//update user Start
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    console.log("updated Data", data);
    const response = await fetch(
      `https://662215bd27fcd16fa6c8b53f.mockapi.io/crudredux/${data.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      console.log("updateUser", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
//update user End

const initialState = {
  users: [],
  loading: false,
  error: null,
  searchData: "",
};

export const UserDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    searchUser: (state, action) => {
      console.log("action.payload searchUser", action.payload);
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log("delete action", action.payload.id);

        const { id } = action.payload;
        if (id) {
          state.users = state.users.filter((user) => user.id !== id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((elem) =>
          elem.id === action.payload.id ? action.payload : elem
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { searchUser } = UserDetailSlice.actions;

export default UserDetailSlice.reducer;
