<template>
  <div class="card">
    <div class="card-header bg-sub-caption sub-title">
     <h5><slot name="card-header"></slot></h5>
    </div>
    <div>
      <div class="card-body border-bottom" v-for="lastItem in lastItems">
        <div class="image-container">
          <img v-if="lastItem.images.length >0"
               :src="require(`@images/${lastItem.images[0].filePath}`).default"
               class="card-img-top"
               alt=""
          >
        </div>
        <div class="card-content">
          <h5 class="card-title">
            <router-link :to="{name:routeName,params:{id:lastItem.id}}">{{lastItem.title}}</router-link>
          </h5>
          <p class="card-text">
            <span v-html="lastItem.content.slice(0,150)+ '....'"></span>
            <router-link :to="{name:routeName,params:{id:lastItem.id}}" class="d-block mb-3">
              прочети >>>
            </router-link>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "LastItems",
  props:{
    routeName:{
      type: String
    },
    storeModule:{
      type: String
    }
  },
  computed:{
    lastItems(){
      const lastItems = this.$store.getters[`${this.storeModule}/getItems`]["hydra:member"];
      if(Array.isArray(lastItems) && lastItems.length > 0 ){
        return lastItems.slice(0,5);
      }
      return null;
    },
  }
}
</script>

<style scoped>
  .card-header{
    border-color: rgb(255, 255, 255);
    border-bottom: 1px solid #fff;
    background-color: rgba(140, 23, 28, 0.8);
    color: #ffffff;
  }
  .card-body{
    padding: 0;
  }
  .card-content{
    padding: 0 22px;
  }
  .image-container{
    margin-bottom: 14px;
    text-align: center;
    background-color: var(--bg-main);
  }
  img{
    max-height: 200px;
    height: 90%;
    width: auto;
    max-width: 90%;
    margin: 1rem;
  }
</style>