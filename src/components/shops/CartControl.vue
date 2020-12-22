<template>
  <div class="cartcontrol">
    <span @click="decreaseCount" class="cartbutton button-minus" v-if="food.count>0">
      <i class="fa fa-minus"></i>
    </span>
    <span class="cartcount" v-if="food.count>0">{{food.count}}</span>
    <span @click="increaseCount" class="cartbutton">
      <i class="fa fa-plus-circle"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "CartControl",
  props: {
    food: Object,
  },
  methods: {
    decreaseCount() {
      this.food.count--;
    },
    increaseCount() {
      this.food.count++;
    }
  }
}
</script>

<style scoped>
  .cartcontrol {
    display: flex;
    align-items: center;
  }
  .button-minus {
    border: 1px solid rgb(58, 124, 247);;
    border-radius: 50%;
    /* box-sizing: border-box; */
    padding: 0.1rem;
    font-size: 0.7rem;
  }
  .cartbutton .fa {
    color: rgb(58, 124, 247);
  }
  .cartcount {
    margin: 0 0.8rem;
    font-weight: normal;
    font-size: 1rem !important;
    color: rgb(61, 61, 61) !important;
  }
</style>