import fetcher from "@/services/fetcher";
import type LoginInterface from "@/assets/helpers/interfaces/LoginInterface";
import type SignUpInterface from "@/assets/helpers/interfaces/SignUpInterface";


export const auth = {
    async login(model: LoginInterface) {
        return await fetcher.post("login", model).then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },
    async signup(model: SignUpInterface) {
        return await fetcher.post("signup", model).then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },
    async logout() {
        return await fetcher.get("logout").then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },

}

export const productRequest = {
    async get() {
        return await fetcher.get("products",).then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },
}



