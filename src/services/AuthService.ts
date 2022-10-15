import fetcher from "@/services/fetcher";
import type LoginInterface from "@/assets/helpers/interfaces/LoginInterface";


export const auth = {
    async login(model: LoginInterface) {
        return await fetcher.post("login", model).then((res)=>{
            console.log(res)
            return res
        }).catch((err)=>{
            console.log(err.response.data.error)
            return err.response.data.error
        });
    },
}



