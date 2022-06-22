<template>
  <div class="container">
    <Menu />
    <div class="row h-100">
      <LanguageFilter optionLabel="title" optionValue="idlanguage" :options="languages" placeholder="Select a language" @changeFrom="changeFrom" @changeTo="changeTo"/>
      <div class="col-12">
        <ReviewDataTable :languageFrom="fromLanguageSelected" :languageTo="toLanguageSelected"/>
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