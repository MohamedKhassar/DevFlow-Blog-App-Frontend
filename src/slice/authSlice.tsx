import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginUserType, RegisterUserType } from "types";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState: { user: RegisterUserType | null, isLoading: boolean, error: string | null } = {
    user: null,
    isLoading: false,
    error: null,
}

export const registerUser = createAsyncThunk(
    "users/register",
    async (payload: RegisterUserType, { rejectWithValue }) => {
        try {
            if (payload.name && payload.email && payload.password) {
                const emailRGX = new RegExp('^[A-Za-z0-9._-]+@([A-Za-z]+)\\.[A-Za-z]{2,4}$', 'g')
                const nameRGX = new RegExp('^[A-Za-z\\s]{3,30}$', 'g')
                const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$');
                if (emailRGX.test(payload.email)) {
                    if (nameRGX.test(payload.name)) {
                        if (passwordRegex.test(payload.password!)) {
                            const response = await axios.post("http://192.168.1.8:8080/api/register", payload)
                            return response.data
                        } else {
                            return rejectWithValue("Password must have 8+ characters: one uppercase, one lowercase, one digit, and one special character.")
                        }
                    } else {
                        return rejectWithValue("Name must be at least 3 characters.")
                    }
                } else {
                    return rejectWithValue("Invalid email address.")
                }
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

export const loginUser = createAsyncThunk(
    "users/login",
    async (payload: LoginUserType, { rejectWithValue }) => {
        try {
            if (payload.email && payload.password) {
                const emailRGX = new RegExp('^[A-Za-z0-9._-]+@([A-Za-z]+)\\.[A-Za-z]{2,4}$', 'g')
                const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$');
                if (emailRGX.test(payload.email)) {
                    if (passwordRegex.test(payload.password!)) {
                        const response = await axios.post("http://192.168.1.8:8080/api/login", payload)
                        return response.data
                    } else {
                        return rejectWithValue("Password must have 8+ characters: one uppercase, one lowercase, one digit, and one special character.")
                    }
                } else {
                    return rejectWithValue("Invalid email address.")
                }
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
    })
export const getUser = createAsyncThunk(
    "users/get",
    async (_, { rejectWithValue }) => {
        try {
            const token = cookies.get("token")
            const response = await axios.get(`http://192.168.1.8:8080/api/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue("An unexpected error occurred");
            }
        }
    })

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: (state) => state = { ...state, error: null, isLoading: false },
        logout: (state) => {
            cookies.remove("token", { path: "/" })
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string || "Something went wrong"
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<RegisterUserType>) => {
                state.user = action.payload
                state.isLoading = false
                state.error = null
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string || "Something went wrong"
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterUserType>) => {
                state.user = action.payload
                state.isLoading = false
                state.error = null
                state.user = action.payload
                // console.log(state.user)
                cookies.set("token", action.payload.token)
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string || "Something went wrong"
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<RegisterUserType>) => {
                // state.user = action.payload
                cookies.set("token", action.payload.token)
                console.log(state.user)
                state.isLoading = false
                state.error = null
            })
    }
})
export const { resetState, logout } = userSlice.actions;
export default userSlice.reducer