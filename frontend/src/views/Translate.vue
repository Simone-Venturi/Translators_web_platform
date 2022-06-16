<template>
  <div class="container">
    <Menu />
    <div class="row h-100">
      <div class="col-12">
        <p>Translate Sentences from 
          <Dropdown optionLabel='title' optionValue='idlanguage' :options="languages" placeholder="Select a language" ref="languageFrom" @change="changeFrom"/>
          to 
          <Dropdown optionLabel='title' optionValue='idlanguage' :options="languages" placeholder="Select a language"  ref="languageTo" @change="changeTo"/>
        </p>
      </div>
      <div class="col-12">
        <TranslateDataTable :languageFrom="fromLanguageSelected" :languageTo="toLanguageSelected" ref="sentenceTable"/>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Dropdown from '@/components/DropdownLayout.vue';
import TranslateDataTable from '@/components/TranslateDataTable.vue';
import LanguageService from "../services/language.service";

export default {
  name: "Translate",
  components: {
    Menu,
    Dropdown,
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
    changeFrom(){
      this.fromLanguageSelected = this.$refs.languageFrom.selected
    },
    changeTo(){
      this.toLanguageSelected = this.$refs.languageTo.selected
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