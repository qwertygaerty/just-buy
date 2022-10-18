<template>
  <div class="card w-full">

    <DataView :value="products" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField" class="w-full">

      <template #empty>
        <SkeletonCard v-if="isLoading"  :number-of-skeleton="numberOfSkeleton"/>
      </template>

      <template #header>
        <div class="grid grid-nogutter">
          <div class="col-6" style="text-align: left">
            <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Сортировка цены"
                      @change="onSortChange($event)"/>
          </div>
          <div class="col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout"/>
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <div class="product-list-item">
            <Image src="https://random.imagecdn.app/1920/1080" alt="Image Text" preview/>

            <div class="product-list-detail">
              <div class="product-name">{{ slotProps.data.name }}</div>
              <div class="product-description">{{ slotProps.data.description.slice(0, 80) }}{{slotProps.data.description.length > 80 ? '...' : ''}}</div>
            </div>

            <div class="product-list-action">
              <span class="product-price">${{ slotProps.data.price }}</span>
              <Button icon="pi pi-shopping-cart" label="Add to Cart" v-if="isAuth()"/>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">

        <div v-if="!isLoading" class="col-12 md:col-4 p-0">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <i class="pi pi-tag product-category-icon"></i>
              </div>
            </div>
            <div class="product-grid-item-content">
              <Image src="https://random.imagecdn.app/500/150" class="card-image" alt="Image Text" preview/>
              <div class="product-name">{{ slotProps.data.name }}</div>
              <div class="product-description">{{ slotProps.data.description.slice(0, 120) }}{{slotProps.data.description.length > 120 ? '...' : ''}}</div>

            </div>
            <div class="product-grid-item-bottom">
              <span class="product-price">${{ slotProps.data.price }}</span>
              <Button icon="pi pi-shopping-cart" v-if="isAuth()"/>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script lang="ts" setup>
import type {Ref} from "vue";
import {computed, ref} from "vue";
import {useAsyncState} from "@vueuse/core";
import {productRequest} from "@/services/APIService";
import type Product from "@/assets/helpers/interfaces/Product";
import SkeletonCard from "@/layouts/card/SkeletonCard.vue"
import {isAuth} from "@/services/fetcher";

const layout = ref('grid');
const sortKey = ref();
const sortOrder = ref();
const sortField = ref();
const numberOfSkeleton = 9
const sortOptions = ref([
  {label: 'Цена по убыванию', value: '!price'},
  {label: 'Цена по возрастанию', value: 'price'},
]);

const {state, isReady, isLoading} = useAsyncState(
    productRequest.get(),
    [],
)

const products: Ref<Product[]> = computed(() => state?.value?.data?.data)

const onSortChange = (event: { value: { value: any; }; }) => {
  const value = event.value.value;
  const sortValue = event.value;

  if (value.indexOf('!') === 0) {
    sortOrder.value = -1;
    sortField.value = value.substring(1, value.length);
    sortKey.value = sortValue;
  } else {
    sortOrder.value = 1;
    sortField.value = value;
    sortKey.value = sortValue;
  }
};

</script>

<style lang="scss" scoped>
.card {
  background: #ffffff;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 2rem;
}

.p-dropdown {
  width: 14rem;
  font-weight: normal;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.product-description {
  margin: 0 0 1rem 0;
}

.product-category-icon {
  vertical-align: middle;
  margin-right: .5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
}

::v-deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;
  gap: 1rem;

  img {
    width: 20rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .p-rating {
    margin: 0 0 .5rem 0;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: .5rem;
    align-self: flex-end;
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
  }

  .p-button {
    margin-bottom: .5rem;
  }
}

::v-deep(.product-grid-item) {
  margin: .5rem;
  border: 1px solid var(--surface-border);

  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin: 2rem 0;
    width: 100%;
    height: 12rem;
  }

  .product-grid-item-content {
    text-align: left;
    height: 25rem;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

@media screen and (max-width: 576px) {
  .product-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 2rem 0;
    }

    .product-list-detail {
      text-align: center;
    }

    .product-price {
      align-self: center;
    }

    .product-list-action {
      display: flex;
      flex-direction: column;
    }

    .product-list-action {
      margin-top: 2rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
}
</style>