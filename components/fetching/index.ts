import axios from "axios";

export const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const routes = {
    registerUser: "register_user",
    loginUser: "login_user",
};
