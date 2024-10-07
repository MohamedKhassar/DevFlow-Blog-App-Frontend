import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserType } from "types";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState: { user: UserType, isLoading: boolean, error: string | null } = {
    user: cookies.get("user") || null,
    isLoading: false,
    error: null,
}

export const registerUser = createAsyncThunk<
    UserType,
    UserType,
    {
        rejectValue: string
    }
>(
    "users/register",
    async (payload: UserType, { rejectWithValue }) => {
        try {
            if (payload.name && payload.email && payload.password) {
                const response = await axios.post("http://192.168.1.8:8080/api/register", payload)
                return response.data
            } else {
                return rejectWithValue("All fields are required")
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue("An unexpected error occurred");
            }
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.isLoading = false
                state.error = action.payload || "Something went wrong"
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<UserType>) => {
                state.user = action.payload
                state.isLoading = false
                state.error = null
            })
    }
})
export default userSlice.reducer