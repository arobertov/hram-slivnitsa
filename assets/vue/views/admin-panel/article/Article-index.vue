<template>
    <div class="main-content">
        <div v-if="hasError" class="alert alert-danger" role="alert">
          {{ error }}
        </div>
        <div v-if="isLoading" class="alert alert-info">
            Зареждане на статий ...
        </div>
        <div v-else-if="!hasArticles" class="row col">
            Няма публикувана статия !
        </div>
        <div  v-else>
            <b-table hover
                     id="article-dashboard-index"
                     :items="articles['hydra:member']"
                     :fields="fields"
                     :per-page="perPage"
                     :current-page="currentPage"
            >
                <template v-slot:cell(title)="data">
                    <div>{{data.item.title}}</div>
                    <b-button-group  size="sm" style="font-size: 0.5rem">
                        <b-button squared
                                :to="{name:'admin_article_show',params:{id:data.item.id}}"
                        >
                            Прегледай
                        </b-button>
                        <b-button squared
                                  :to="{name:'admin_article_edit',params:{id:data.item.id}}"
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
                  <b-button variant="success">Намерени са <b-badge variant="light">{{rows}}</b-badge> статии</b-button>
                </div>
              <router-link :to="{ name:'admin_article_new' }" class="col-md-4" tag="div">
                <b-button variant="secondary">Създай статия<span class="ml-3 mb-2"><b-icon-plus-square></b-icon-plus-square></span></b-button>
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
const items = [{text:'Статии',to:{name:'admin_article_index'}}];
    export default {
        name: "Article-index",
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
                ]
           }
        },
        computed: {
            rows() {
                const rows =  this.$store.getters["ArticleModule/articles"];
                return rows["hydra:member"].length;
            },
            isLoading() {
                return this.$store.getters["ArticleModule/isLoading"];
            },
            hasError() {
                return this.$store.getters["ArticleModule/hasError"];
            },
            error() {
                return this.$store.getters["ArticleModule/error"];
            },
            hasArticles() {
                return this.$store.getters["ArticleModule/hasArticles"];
            },
            articles() {
                return this.$store.getters["ArticleModule/articles"];
            },
        },
        created() {
            this.$store.commit("ArticleModule/FETCHING_ARTICLES");
            if(this.$store.getters["ArticleModule/articles"].length <= 1){
                 this.$store.dispatch("ArticleModule/findAll");
            }
            this.$store.commit("MainModule/ATTACH_BREADS",items)
        },
        destroyed() {
          this.$store.commit("MainModule/DETACH_BREADS",items);
        },
        methods:{
            async delete(itemId){
                const result = await this.$store.dispatch("ArticleModule/deleteArticle",itemId);
                if(result !== null){
                    await this.deleteSuccessModal(result);
                }
            },
            deleteSuccessModal(result){
                this.$bvModal.msgBoxOk('Статията '+result+ 'бе изтрита успешно !', {
                        id:'delete-success-modal',
                        title: 'ПОТВЪРЖДЕНИЕ !',
                        size: 'lg',
                        buttonSize: 'lg',
                        okVariant: 'success',
                        headerClass: 'p-2 border-bottom-0',
                        footerClass: 'p-2 border-top-0',
                        centered: true,
                });
                setTimeout(()=>{this.$bvModal.hide('delete-success-modal')},3000);
            },
            deleteModal(itemId){
                this.$bvModal.msgBoxConfirm('Моля потвърдете че искате да изтриете статията !', {
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
    };
</script>

<style scoped>

</style>