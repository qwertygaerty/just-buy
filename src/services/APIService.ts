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

export const CartRequest = {
    async add(product_id: number) {
        return await fetcher.post(`cart/${product_id}`).then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },

    async del(product_id: number) {
        return await fetcher.delete(`cart/${product_id}`).then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },

    async get() {
        return await fetcher.get(`cart`).then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },

}





