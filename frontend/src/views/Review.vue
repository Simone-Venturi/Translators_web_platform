<template>
  <div class="container">
    <Menu />
    <div class="row h-100">
      <LanguageFilter optionLabel="title" optionValue="idlanguage" :options="languages" placeholder="Select a language" @changeFrom="changeFrom" @changeTo="changeTo"/>
      <div class="col-12">
        <ReviewDataTable :languageFilter="languageFilter" @rated="updateFilter" @updatedLanguageFilter="updatedLanguageFilter"/>
      </div>
    </div>
  </div>  
</template>

<script>
import Menu from '@/components/Menu.vue'
import LanguageFilter from '@/components/DropdownFilterComponent.vue';
import LanguageService from "../services/language.service";
import ReviewDataTable from "@/components/ReviewDataTable.vue"

export default {
  name: "Review",
  components: {
    Menu,
    LanguageFilter,
    ReviewDataTable
  },
  data() {
    return {
      content: "Review",
      languages: [],
      languageFilter: {        
        fromLanguageSelected: null,
        toLanguageSelected: null,
        update: false
      }
    };
  },
  methods:{
    changeFrom(payload){
      this.languageFilter.fromLanguageSelected = payload.id
      this.languageFilter.update=true

    },
    changeTo(payload){
      this.languageFilter.toLanguageSelected = payload.id
      this.languageFilter.update=true
    },
    updateFilter(){
      this.languageFilter.update=true
    },
    updatedLanguageFilter(){
      this.languageFilter.update=false
    },
  },
  mounted(){
    LanguageService.getAllLanguages().then(
      (response) => {
        this.languages = response.data;
      },
      (error) => {
        console.log(error)
      }
    );
  }
};
</script>
<style scoped>
  .col-3 {
    text-align: center;
  }
</style>