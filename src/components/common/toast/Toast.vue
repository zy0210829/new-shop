<template>
  <div class="toast" v-show="isShow">
    {{message}}
    </div>
</template>

<script>
export default {
  name: "Toast",
  data(){
    return{
      message:'',
      isShow:false
    }
  },
  methods:{
    show(message='点击错误',time=1000){
      this.isShow = true;
      this.message = message;

      setTimeout(()=>{
        this.isShow = false;
        this.message = '';
      },time)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  left: 50%;
  top:50%;
  transform:translate(-50%,-50%);
  background-color: rgba(0,0,0,.7);
  color: #fff;
  padding: 8px 10px;
  z-index: 999;
}
</style>
