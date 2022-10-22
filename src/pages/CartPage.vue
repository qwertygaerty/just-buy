<template>
  <Toast/>
  <SkeletonTable v-if="isLoading" :number-of-skeleton="6"/>
  <EmptyCart v-if="!isLoading && cartProducts.length === 0"/>
  <div v-if="!isLoading && cartProducts.length > 0" class="card p-fluid">
    <DataTable :value="cartProducts" responsiveLayout="stack" :paginator="true" :rows="5"
               removableSort breakpoint="960px">
      <Column header="">
        <template #body>
          <img src="https://random.imagecdn.app/500/150" alt="image"
               class="product-image"/>
        </template>
      </Column>
      <Column field="name" header="Название">
        <template #body="slotProps">
          <h3 class="card_title">{{ slotProps.data.name }}</h3>
        </template>
      </Column>
      <Column field="description" header="Описание" class="w-4 gap-4"></Column>
      <Column :sortable="true" field="price" header="Цена">
        <template #body="slotProps">
          {{ slotProps.data.price }}
        </template>
      </Column>

      <Column :sortable="true" field="count" header="Количество">
        <template #body="slotProps">
          <div class="flex justify-content-center gap-3 align-items-center">
            <BlockUI :blocked="blockUI">
              <Button @click="addToCart(slotProps.data)" icon="pi pi-plus" class="p-button-rounded p-button-text"/>
            </BlockUI>
              {{ slotProps.data.count }}
            <BlockUI :blocked="blockUI">
              <Button @click="removeFromCart(slotProps.data)" icon="pi pi-minus" class="p-button-rounded p-button-text"/>
            </BlockUI>
          </div>
        </template>
      </Column>

      <template #footer>
        <div class="flex justify-content-between gap-3 flex-wrap align-items-center">
          <h4>Количество товаров - {{ products ? products.length : 0 }}</h4>
          <h4>Общая цена - {{ getAmount }}</h4>
          <div class="w-10 lg:w-2">
            <Button @click="createOrder" icon="pi pi-shopping-bag" class="w-full" label="Оформить заказ"
                    :disabled="!products?.length > 0"/>
          </div>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import type {Ref} from "vue";
import {computed, onMounted, ref,} from "vue";
import {CartRequest, OrderRequest} from "@/services/APIService";
import type Product from "@/assets/helpers/interfaces/Product";
import SkeletonTable from "@/components/table/SkeletonTable.vue"
import {useToast} from "primevue/usetoast";
import EmptyCart from "@/components/cart/EmptyCart.vue";
import type {CartProduct} from "@/assets/helpers/interfaces/CartProduct";


const filterProducts = (data: Ref<Product[]>) => {
  let filteredArray: any[] = [];
  let cartData: Ref<CartProduct[]> = data;
  cartData.value.forEach((prod) => {
    let filteredProduct = filteredArray.findIndex(fp => prod.product_id === fp.product_id);
    if (filteredProduct != -1) {
      filteredArray[filteredProduct].products.push(prod);
      filteredArray[filteredProduct].count++;
    } else {
      prod.count = 1;
      prod.products = [prod];
      filteredArray.push(prod);
    }
  })
  return filteredArray;
}
const getAmount = computed(() => {
  if (isLoading.value) return;
  let initialPrice = 0;
  products.value.forEach((val) => {
    initialPrice += val.price
  });
  return initialPrice;
})

const products: Ref<Product[]> = ref([]);
let cartProducts = ref();

let isLoading = ref(true);
let blockUI = ref(false);
const getData = async () => {
  products.value = (await CartRequest.get())?.data?.data;
  isLoading.value = false;
  cartProducts.value = filterProducts(products);
}
onMounted(() => {
  getData();
})

const addToCart = async (product: CartProduct) => {
  if (!product.product_id) return;
  blockUI.value = true;
  let res = await CartRequest.add(product.product_id);
  if (res?.status === 201) {
    await getData();
    blockUI.value = false;
  }
}
const removeFromCart = async (product: CartProduct) => {
  if (!product.products) return;
  blockUI.value = true;
  let res = await CartRequest.remove(product.products[0].id);
  if (res?.status === 200) {
    await getData();
    blockUI.value = false;
  }
}

const toast = useToast();
const createOrder = async () => {
  let res = await OrderRequest.create();
  let toastMessage = {severity: 'error', summary: 'Что-то пошло не так!', detail: res.message, life: 3000};
  if (res?.status === 201) {
    toastMessage.severity = 'success';
    toastMessage.summary = 'Заказ успешно оформлен';
    await getData();
  }
  toast.add(toastMessage);
}

</script>

<style scoped lang="scss">
@media screen and (max-width: 576px) {
  .card_title {
    font-size: medium;
  }
  .product-image {
    width: 100%;
  }
}
</style>