<template>
  <div class="container">
    <Menu />
    <div class="row h-100">
      <LanguageFilter optionLabel="title" optionValue="idlanguage" :options="languages" placeholder="Select a language" @changeFrom="changeFrom" @changeTo="changeTo"/>
      <div class="col-12">
        <TranslateDataTable :languageFilter="languageFilter" @updatedLanguageFilter="updatedLanguageFilter"/>
      </div>
    </div>
  </div>  
</template>

<script>
import Menu from '@/components/Menu.vue'
import LanguageFilter from '@/components/DropdownFilterComponent.vue';
import TranslateDataTable from '@/components/TranslateDataTable.vue';
import LanguageService from "../services/language.service";

export default {
  name: "Translate",
  components: {
    Menu,
    LanguageFilter,
    TranslateDataTable
  },
  data() {
    return {
      content: "Translate",
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
      this.updateFilter()
    },
    changeTo(payload){
      this.languageFilter.toLanguageSelected = payload.id
      this.updateFilter()
    },    
    updateFilter(){
      this.languageFilter.update=true
    },
    updatedLanguageFilter(){
      this.languageFilter.update=false
    },
  },
  mounted(){
    LanguageService.getAllLanguagesFilteredByUser().then(
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