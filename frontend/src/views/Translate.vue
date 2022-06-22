<template>
  <div class="container">
    <Menu />
    <div class="row h-100">
      <LanguageFilter optionLabel="title" optionValue="idlanguage" :options="languages" placeholder="Select a language" @changeFrom="changeFrom" @changeTo="changeTo"/>
      <div class="col-12">
        <TranslateDataTable :languageFrom="fromLanguageSelected" :languageTo="toLanguageSelected"/>
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
      fromLanguageSelected: null,
      toLanguageSelected: null
    };
  },
  methods:{
    changeFrom(payload){
      this.fromLanguageSelected = payload.id
    },
    changeTo(payload){
      this.toLanguageSelected = payload.id
    }
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