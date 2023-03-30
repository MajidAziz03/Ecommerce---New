import axios from "axios";
import { AUTH_URL, BASE_URL } from "./globalconfig";



const instance = axios.create({
    baseURL: BASE_URL
})

const authInstance = axios.create({
    baseURL: AUTH_URL
})


export const products = async () => {
    try {
        const res = await instance.get('products')
        return res.data.products

    } catch (error) {
        console.log("error occurred")
    }
}

