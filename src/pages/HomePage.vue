<template>
  <div class="card">
    <Timeline :value="events1" align="" class="customized-timeline">
      <template #marker="slotProps">
        <span class="custom-marker shadow-2" :style="{color: slotProps.item.color}"><i
            :class="slotProps.item.icon"></i></span>
      </template>


      <template #content="slotProps">
        <Card>
          <template #content>
            <div class="parallax-item fl-wrap" data-scrollax-parent="true">
              <div class="parallax-header fl-wrap">
                <span>01.</span>
              </div>
              <img src="http://demowp.cththemes.com/balkon/wp-content/uploads/2016/10/2-5.jpg"
                   class="attachment-balkon_folio_thumb size-balkon_folio_thumb wp-post-image" alt="">
              <div class="parallax-text" :class="slotProps.item.type === 'left' ? 'left-pos' : 'right-pos'" data-scrollax="properties: { translateY: '-250px' }">
                <h3 class="card-title parallax-text parallax-layer">{{ slotProps.item.status }}</h3>
                <a href="http://demowp.cththemes.com/balkon/portfolio/theatre-de-stoep/"
                   class="btn float-btn flat-btn text-color my-3">Зарегистрироваться</a>

              </div>
            </div>
          </template>
        </Card>
      </template>
    </Timeline>
  </div>
</template>


<script setup lang="ts">
import {ref} from "vue";

const events1 = ref([
  {status: 'Зарегистрируйтесь', icon: 'pi pi-user', color: '#3F51B5FF', image: 'game-controller.jpg', type : 'left'},
  {status: 'Добавьте товары в корзину', icon: 'pi pi-shopping-cart', color: '#0C85FFFF', type : 'right'},
  {status: 'Оформите заказ', icon: 'pi pi-check-circle', color: '#0C85FFFF', type : 'left'},
]);


</script>

<style lang="scss">

.parallax-item {
  margin: 2rem 0;
}

.parallax-item img {
  height: auto;
  opacity: 0.7;
}

.parallax-text {
  position: absolute;
  bottom: 20%;
  z-index: 10;

}

.parallax-text.right-pos {
  right: -18rem;
}

.parallax-text.left-pos {
  left: -5rem;
}

.parallax-text h3 {
  font-size: 3.5rem;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  position: relative;
  cursor: pointer;

}

.parallax-text h3:before {
  content: '';
  position: absolute;
  top: -30px;
  width: 4rem;
  height: 0.3rem;
  left: 0;
  background: #0C85FFFF;
}

.parallax-text h3:after {
  content: '';
  position: absolute;
  top: -5px;
  bottom: -10px;
  width: 1px;
  -webkit-transition: all 2000ms cubic-bezier(.19, 1, .22, 1) 0ms;
  right: -40px;
  background: rgba(12, 133, 255, 0.34);
  z-index: -1;
}

.parallax-text h3:hover:after {
  width: 120%;
  opacity: 0.4;
}

.parallax-text h3 a {
  position: relative;
  z-index: 10;
}

.parallax-text h4 {
  text-align: left;
  color: #292929;
  padding: 15px 0;
}

.parallax-header {
  padding-bottom: 2rem;
  display: inline-block;
}

.parallax-header span {
  float: left;
  font-size: 2rem;
  text-align: left;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  position: relative;
}

.parallax-header span:before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 60px;
  width: 150px;
  background: #eee;
  height: 1px;
}

.parallax-header ul li {
  float: left;
  padding-left: 15px;
  text-align: left;
}

.card-title {
  color: rgba(0, 0, 0, 0.94);
}

.custom-marker {
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border-radius: 50%;
  z-index: 1;
}

::v-deep(.p-timeline-event-content),
::v-deep(.p-timeline-event-opposite) {
  line-height: 1;
}

@media screen and (max-width: 960px) {
  ::v-deep(.customized-timeline) {
    .p-timeline-event:nth-child(even) {
      flex-direction: row !important;

      .p-timeline-event-content {
        text-align: left !important;
      }
    }

    .p-timeline-event-opposite {
      flex: 0;
    }

    .p-card {
      margin-top: 1rem;
    }
  }
}


</style>