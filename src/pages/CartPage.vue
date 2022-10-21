<template>

  <SkeletonTable v-if="isLoading" :number-of-skeleton="6"/>

  <div v-if="!isLoading" class="card p-fluid">
    <DataTable :value="filterProducts(products, 'product_id')" responsiveLayout="stack" :paginator="true" :rows="5"
               removableSort breakpoint="960px">
      <Column header="">
        <template #body>
          <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="image"
               class="product-image"/>
        </template>
      </Column>
      <Column field="name" header="Имя">
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
            <Button icon="pi pi-plus" class="p-button-rounded p-button-text"/>
            {{ slotProps.data.count }}
            <Button icon="pi pi-minus" class="p-button-rounded p-button-text"/>
          </div>
        </template>
      </Column>

      <template #footer>
        <div class="flex justify-content-between gap-3 flex-wrap align-items-center">
          <h4>Количество товаров - {{ products ? products.length : 0 }}</h4>
          <h4>Общая цена - {{ getAmount }}</h4>
          <div class="w-10 lg:w-2">
            <Button @click="" icon="pi pi-shopping-bag" class="w-full" label="Оформить заказ"
                    :disabled="!products?.length > 0"/>
          </div>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import type {Ref} from "vue";
import {computed,} from "vue";
import {CartRequest} from "@/services/APIService";
import {useAsyncState} from "@vueuse/core";
import type Product from "@/assets/helpers/interfaces/Product";
import SkeletonTable from "@/components/table/SkeletonTable.vue"

const {state, isReady, isLoading} = useAsyncState(CartRequest.get(), []);
const products: Ref<Product[]> = computed(() => state?.value?.data?.data);

const filterProducts = (data: any[], key: string | number) => {
  let filteredArray: any[] = [];
  data.forEach((prod) => {
    let filteredProduct = filteredArray.findIndex(fp => prod[key] === fp[key])
    if (filteredProduct != -1) {
      filteredArray[filteredProduct].count++;
    } else {
      prod.count = 1;
      filteredArray.push(prod);
    }
  })
  console.log(filteredArray)
  return filteredArray;
}

console.log(products)

const getAmount = computed(() => {
  if (isLoading.value) return;
  let initialPrice = 0;
  products.value.forEach((val) => {
    initialPrice += val.price
  });
  return initialPrice;
})

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