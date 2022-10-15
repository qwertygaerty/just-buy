import fetcher from "@/assets/fetcher";
import type LoginInterface from "@/assets/helpers/interfaces/LoginInterface";

export default class AuthService {
    login = async (model: LoginInterface) => {
        let data = await fetcher.post("login", model).catch((res) => {
            console.log(res)
        })
        console.log(data)
    }
}


