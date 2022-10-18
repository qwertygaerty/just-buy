<template>
  <div class="card">

    <DataView v-if="!isLoading" :value="products" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder"
              :sortField="sortField">
      <template #header>
        <div class="grid grid-nogutter">
          <div class="col-6" style="text-align: left">
            <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price"
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
            <Image src="https://picsum.photos/1920/1080" width="350" alt="Image Text" preview></Image>

            <div class="product-list-detail">
              <div class="product-name">{{ slotProps.data.name }}</div>
              <div class="product-description">{{ slotProps.data.description }}</div>
            </div>
            <div class="product-list-action">
              <span class="product-price">${{ slotProps.data.price }}</span>
              <Button icon="pi pi-shopping-cart" label="Add to Cart"></Button>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 md:col-4">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <i class="pi pi-tag product-category-icon"></i>
                <span class="product-category">{{ slotProps.data.category }}</span>
              </div>
            </div>
            <div class="product-grid-item-content">
              <Image src="https://picsum.photos/1920/900" width="350" alt="Image Text" preview></Image>
              <div class="product-name">{{ slotProps.data.name }}</div>
              <div class="product-description">{{ slotProps.data.description }}</div>

            </div>
            <div class="product-grid-item-bottom">
              <span class="product-price">${{ slotProps.data.price }}</span>
              <Button icon="pi pi-shopping-cart"></Button>
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

console.log(state.value)
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
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
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

  img {
    min-width: 50px;
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
  }

  .product-grid-item-content {
    text-align: left;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

.product-grid-item-skeleton {
  box-shadow: none;
  min-width: 20rem;
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