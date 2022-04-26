<template>
  <div class="main-content">
    <div v-if="hasError" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <div v-if="isLoading" class="alert alert-info">
      Зареждане  ...
    </div>
    <div v-else-if="!hasItems" class="row col">
      Няма създадена публикация !
    </div>
    <div  v-else>
      <b-table hover
               id="article-dashboard-index"
               :items="items['hydra:member']"
               :fields="fields"
               :per-page="perPage"
               :current-page="currentPage"
      >
        <template v-slot:cell(title)="data">
          <div>{{data.item.title}}</div>
          <b-button-group  size="sm" style="font-size: 0.5rem">
            <b-button squared
                      :to="{name:`${routePerfix}_show`,params:{id:data.item.id}}"
            >
              Прегледай
            </b-button>
            <b-button squared
                      :to="{name:`${routePerfix}_edit`,params:{id:data.item.id}}"
            >
              Редактирай
            </b-button>
            <b-button squared @click="deleteModal(data.item.id)">Изтрий</b-button>
          </b-button-group>
        </template>
        <template v-slot:cell(dateEdited)="data">
          {{data.item.dateEdited | formatDate}}
        </template>
        <template v-slot:cell(owner)="data">
          <span v-if="data.item.owner">{{data.item.owner.alias}}</span>
        </template>
        <template v-slot:cell(category)="data">
          {{data.item.category.name}}
        </template>
        <template v-slot:cell(tags)="data">
          <div v-for="tag in data.item.tags">{{tag.name}}</div>
        </template>
        <template v-slot:cell(isPublished)="data">
          {{data.item.isPublished ? 'Публикувана':'Непубикувана'}}
        </template>
      </b-table>
      <div class="row">
        <div class="col-md-3">
          <b-button variant="success">Намерени са <b-badge variant="light">{{rows}}</b-badge> публикации</b-button>
        </div>
        <router-link :to="{ name:`${routePerfix}_create` }" class="col-md-4" tag="div">
          <b-button variant="secondary">Създай<span class="ml-3 mb-2"><b-icon-plus-square></b-icon-plus-square></span></b-button>
        </router-link>
        <div class="col-md-5">
          <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              :limit="7"
              aria-controls="article-dashboard-index"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import loginForm from "@vue/views/security/LoginForm";

export default {
  name: "ListItemsComponent",
  data(){
    return {
      perPage:6,
      currentPage:1,
      fields:[
        {
          key:'id',
          label:'ИД',
          sortable:true
        },
        {
          key: 'title',
          label: 'Заглавие',
          sortable: true,
        },
        {
          key:'dateEdited',
          label:'Последна редакция',
          sortable:true
        },
        {
          key:'owner',
          label:'Автор',
          sortable:true
        },
        {
          key:'category',
          label:'Категория',
          sortable:true
        },
        {
          key:'tags',
          label:'Етикети',
          sortable:false
        },
        {
          key:'isPublished',
          label:'Статус : ',
          sortable:true
        }
      ],
      modalMsg:'Моля, потвърдете че желате, публикацията да бъде изтрита!'
    }
  },
  props:{
    storeModule:{
      type:String
    },
    routePerfix:{
      type:String
    }
  },
  computed: {
    items() {
      return this.$store.getters[`${this.storeModule}/getItems`];
    },
    isLoading() {
      return this.$store.getters[`${this.storeModule}/isLoading`];
    },
    hasError() {
      return this.$store.getters[`${this.storeModule}/hasError`];
    },
    error() {
      return this.$store.getters[`${this.storeModule}/getError`];
    },
    hasItems() {
      return this.$store.getters[`${this.storeModule}/hasItems`];
    },
    rows() {
      return this.items["hydra:member"].length;
    },
  },
  methods:{
    async delete(itemId){
      const result = await this.$store.dispatch(`${this.storeModule}/deleteItem`,itemId);
      if(result !== undefined && result !== null ){
        await this.deleteMessageModal('ПОТВЪРЖДЕНИЕ !','Публикацията '+result+ 'бе изтрита успешно!','success','success');
      } else{
        await this.deleteMessageModal('НЕЩО СЕ ОБЪРКА :( !!!','Публикацията не  бе изтрита!','danger','danger');
      }

    },
    deleteMessageModal(title,message,headerBgVariant,okVariant){
      this.$bvModal.msgBoxOk(message, {
        id:'delete-success-modal',
        title: title,
        headerBgVariant:headerBgVariant,
        headerTextVariant:'light',
        size: 'sm',
        buttonSize: 'lg',
        okVariant: okVariant,
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true,
      })
      if(okVariant==='success'){
        setTimeout(()=>{this.$bvModal.hide('delete-success-modal')},3000);
      }
    },
    deleteModal(itemId){
      this.$bvModal.msgBoxConfirm('Моля, потвърдете че желате, публикацията да бъде изтрита!', {
        id:'delete-confirm-modal',
        title: 'МОЛЯ ПОТВЪРДЕТЕ !',
        size: 'lg',
        buttonSize: 'lg',
        okVariant: 'danger',
        okTitle: 'ДА',
        cancelTitle: 'НЕ',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
          .then(value => {
            if(value){
              this.delete(itemId);
            }
          })
          .catch(err => {
            this.$bvModal.msgBoxConfirm(err);
          })
    }
  }
}
</script>

<style scoped>

</style>