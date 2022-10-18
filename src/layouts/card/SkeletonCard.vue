<template>
  <div class="w-full flex flex-wrap" >
    <div v-for="skeleton in props.numberOfSkeleton " :key="skeleton" class="col-12 md:col-4">
      <div class="product-grid-item card product-grid-item-skeleton">
        <div class="product-grid-item-content">
          <Skeleton width="100%" height="150px"></Skeleton>
          <Skeleton width="50%" class="my-2" height="1.2rem"></Skeleton>
          <Skeleton height=".7rem" class="my-1"></Skeleton>
          <Skeleton width="80%" height=".7rem" class="my-1"></Skeleton>
          <Skeleton width="60%" height=".7rem" class="my-1"></Skeleton>

        </div>
        <div class="product-grid-item-bottom">
          <Skeleton width="25%" class="my-2" height="1.2rem"></Skeleton>
          <Skeleton shape="circle" size="2rem" borderRadius="4px"/>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  numberOfSkeleton: { type: Number, required: true },
})
</script>

<style scoped>

</style>