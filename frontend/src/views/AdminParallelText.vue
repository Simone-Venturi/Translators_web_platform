<template>
  <div class="container">
    <Menu :isAdmin="true" :routesAvailable="['dataset', 'paralleltext']" />
    <div class="row h-100">
      <LanguageFilter optionLabel="title" optionValue="idlanguage" :options="languages" placeholder="Select a language" @changeFrom="changeFrom" @changeTo="changeTo"/>
      <div class="col-12 m-2">
        <h3>All ParallelTexts</h3>
        <AlignmentDataTable :languageFilter="languageFilter" @updatedLanguageFilter="updatedLanguageFilter" ref="alignmentTable"/>
      </div>
      <div class="col-12 m-2 mt-4">
        <h3>Create a new Parallel Text</h3>
        <div class="row">
          <div class="col-md-6">
            <h4>Original Text</h4>
            <label for="original_language">Original language</label>
            <Dropdown id="original_language" optionLabel="title" optionValue="idlanguage" :options="languages" placeholder="Select a language" ref="languageFrom" @change="changeLanguageFrom"/>
            <Textarea v-model="originalText" :autoResize="true" rows="10" cols="80" style="width:100%" class="mt-2 mb-2" />
          </div>
          <div class="col-md-6">
            <h4>Translated Text</h4>
            <label for="translated_language">Translated language</label>
            <Dropdown id="translated_language" optionLabel="title" optionValue="idlanguage" :options="languages" placeholder="Select a language" ref="languageTo" @change="changeLanguageTo"/>
            <Textarea v-model="translatedText" :autoResize="true" rows="10" cols="80" style="width:100%" class="mt-2 mb-2" />
          </div>
        </div>        
        <div class="row ml-4 mr-4 d-flex justify-content-between">
          <div class="col-4">
            <GeneralButton @click="resetParallelTexts" text="Cancel" colorHover="red"/>
          </div>
          <div class="col-4">
            <GeneralButton @click="sendParallelText" text="Submit ParallelText"/>
          </div>
        </div>
        <Dialog header="Empty Parallel Text" :visible="displayErrorParallelTextModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
            <p class="m-0">Some fields are not filled. <br/> Please check the form.</p>
            <template #footer>
                <Button label="Ok" icon="pi pi-check" @click="toggleDisplayErrorParallelTextModal" autofocus />
            </template>
        </Dialog>
        <Dialog header="Parallel Text created" :visible="displaySuccessParallelTextModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
            <p class="m-0">ParallelText is created with success.</p>
            <template #footer>
                <Button label="Ok" icon="pi pi-check" @click="toggleDisplaySuccessParallelTextModal" autofocus />
            </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import AlignmentDataTable from '@/components/AlignmentDataTable.vue';
import Menu from '@/components/Menu.vue'
import LanguageFilter from '@/components/DropdownFilterComponent.vue';
import Dropdown from '@/components/DropdownLayout.vue';
import GeneralButton from '@/components/GeneralButton.vue'
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import AlignmentsService from '../services/alignment.service';

export default {
  name: "AdminParallelText",
  components: {
    AlignmentDataTable,
    Menu,
    LanguageFilter,
    Dropdown,
    GeneralButton,
    Button,
    Dialog,
    Textarea
  },
  data(){
    return {
      languages: [],
      languageFilter: {        
        fromLanguageSelected: null,
        toLanguageSelected: null,
        update: false
      },
      languageFrom: null,
      originalText: null,
      languageTo: null,
      translatedText: null,
      displayErrorParallelTextModal: false,
      displaySuccessParallelTextModal: false
    }
  },
  mounted() {
    this.languages = this.$store.getters['language/getAllLanguagesKnownByUser']
    this.$store.dispatch('dataset/readAllDatasets');
  },
  methods: {
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
    changeLanguageFrom(){
      this.languageFrom = this.$refs.languageFrom.selected
    },
    changeLanguageTo(){
      this.languageTo = this.$refs.languageTo.selected
    },
    resetParallelTexts(){
      this.languageFrom = null
      this.originalText =null
      this.languageTo = null
      this.translatedText =null
    },
    sendParallelText(){
      if(this.originalText !== null && this.translatedText !== null && this.languageFrom !==null && this.languageTo!==null){
        AlignmentsService.createParallelText(
          this.languageFrom,
          this.originalText,
          this.languageTo,
          this.translatedText
        ).then( _ => {
          this.toggleDisplaySuccessParallelTextModal()
          this.resetParallelTexts()
          this.$refs.alignmentTable.getAlignments()
        })
      } else {
        this.toggleDisplayErrorParallelTextModal()
      }
    },
    toggleDisplayErrorParallelTextModal(){
      this.displayErrorParallelTextModal = !this.displayErrorParallelTextModal
    },
    toggleDisplaySuccessParallelTextModal(){
      this.displaySuccessParallelTextModal = !this.displaySuccessParallelTextModal
    }
  }
};
</script>
<style scoped>
.col-12 *{
  text-align: left;
}
</style>