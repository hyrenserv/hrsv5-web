<template>
<div>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
    <li v-for="(i,item) in count" class="infinite-list-item" :key="item">{{ i }}</li>
  </ul>
</div>
  
</template>

<script>
  export default {
    data () {
      return {
        count: 0
      }
    },
    methods: {
      load () {
        this.count += 2
      }
    }
  }
</script>
<style>
    div{
        height: 300px;
    }
</style>