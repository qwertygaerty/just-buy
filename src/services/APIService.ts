import fetcher from "@/services/fetcher";
import type LoginInterface from "@/assets/helpers/interfaces/LoginInterface";
import type SignUpInterface from "@/assets/helpers/interfaces/SignUpInterface";
import axios from "axios";
import {ref} from "vue";


export const Auth = {
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

export const ProductRequest = {
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

    async remove(product_id: number) {
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

export const OrderRequest = {
    async create() {
        return await fetcher.post(`order`).then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },
    async get() {
        return await fetcher.get(`order`).then((res) => {
            return res
        }).catch((err) => {
            return err.response.data.error
        });
    },
}

export const ImageRequest = {
    async get(inputQuery: string) {
        const query = `https://api.unsplash.com/search/collections?client_id=tlzRN1hxSp_9wH-R5d6Ps6CFJWCo8EbXyuL0Xu1fSqg&Accept-Version=v1&query=${inputQuery}&per_page=35 `;
       return await axios
            .get(query)
            .then((response) => {
                return response.data.results;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    async getImage(inputQuery: string) {
        const images = ref();
        const res = await ImageRequest.get(inputQuery);
        images.value = res.map((image: { preview_photos: any; })=>image.preview_photos.map((preview_photos: { urls: { small: any; }; })=>preview_photos.urls.small)).flat();
        return images.value
    }
}





