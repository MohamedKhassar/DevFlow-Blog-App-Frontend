import { createSlice } from "@reduxjs/toolkit";
import { ThemeType } from "types";

let value = "light";
if (typeof window !== "undefined" && window) {
    const storedTheme = localStorage.getItem('theme');
    value = storedTheme
        ? JSON.parse(storedTheme)  // Safely parse the stored theme
        : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? "dark"
            : "light");  // Fallback to system preference
}


const initialState: ThemeType = {
    value: value
}


const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action) {
            state.value = action.payload;
            localStorage.setItem('theme', JSON.stringify(action.payload));
        },
    },
})
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer