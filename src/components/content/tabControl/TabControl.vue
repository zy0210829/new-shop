<template>
  <div class="control">
    <div v-for="(item,index) in title" class="control-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data(){
    return{
      currentIndex:0,//记录当前选中
    }
  },
  props:{
    title:{
      type:Array,
      data(){
        return []
      }
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit('tabControlClick',index)
    }
  }

}
</script>

<style scoped>
.control{
  display: flex;
  text-align: center;
  font-size:15px;
  height: 40px;
  line-height: 40px;

}
.control-item{
  flex:1;

}
.control-item span{
  padding: 3px;
}
.active{
  color:var(--color-high-text);

}
.active span{
  border-bottom: 3px solid var(--color-high-text);
}

</style>
