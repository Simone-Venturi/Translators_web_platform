<template>
  <div class="container">
    <div class="row ml-4 mr-4">
      <div class="col-3">
        <MenuButton text="Translate" @click="showTranslate"/>
      </div>
      <div class="col-3">
        <MenuButton text="Review" @click="showReview"/>
      </div>
      <div class="col-3">
        <MenuButton text="Alignment" @click="showAlignment"/>
      </div>
      <div class="col-3">
        <MenuButton text="Profile" @click="showProfile"/>
      </div>
    </div>    
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
import MenuButton from '@/components/MenuButton.vue'
import Dropdown from '@/components/DropdownLayout.vue';
import TranslateDataTable from '@/components/TranslateDataTable.vue';
import LanguageService from "../services/language.service";

export default {
  name: "Translate",
  components: {
    MenuButton,
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
    showTranslate(event){
      this.hadSelectedClassToSelectedButton(event)
      this.content = 'Translate'
    },
    showReview(event){
      this.hadSelectedClassToSelectedButton(event)
      this.content = 'Review'
    },
    showAlignment(event){
      this.hadSelectedClassToSelectedButton(event)
      this.content = 'Alignment'
    },
    showProfile(event){
      this.hadSelectedClassToSelectedButton(event)
      this.content = 'Profile'
    },
    hadSelectedClassToSelectedButton(event){
       document.querySelectorAll("button").forEach(el => {
         if(el === event.target){
            el.classList.remove("not-selected")
            el.classList.add("selected")
         } else {
            el.classList.add("not-selected")
            el.classList.remove("selected")
         }
      })
    },
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