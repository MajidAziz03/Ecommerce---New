import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "./globalconfig";



const instance = axios.create({
    baseURL : BASE_URL 
})

// export const loginUser = async(user : string, pass : string) => {
//     try {
//         const response = await instance.post('auth/login', {
//             user,
//             pass
//         })
//         toast.success("login successfully")
//         return response.data;
//     } catch (error: any) {
//         toast.error("error")
//     }
// }