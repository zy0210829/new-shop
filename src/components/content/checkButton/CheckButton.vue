<template>
  <div class="check-button" >

    <div v-if="isChecked" class="imgHeight">
      <img src="../../../assets/img/ches/select_active.svg" alt="">
    </div>
    <div v-else>
      <img src="../../../assets/img/ches/select.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",

  props:{
    isChecked:{
      type:Boolean,
      default:false,
    }
  },


}
</script>

<style scoped>

.check-button img{
  height: 20px;
}
</style>
