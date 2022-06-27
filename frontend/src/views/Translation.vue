<template>
  <div class="container">
    <Menu />
    <div class="w-80">
      <div class="row ml-4 mr-4">
        <div class="col-12">
          <h2>Translation</h2>
        </div>
      </div> 
      <div class="row ml-4 mr-4">
        <div class="col-12">
          <p>{{sentence.sentence}}</p>
        </div>
      </div>    
      <div class="row h-100">
        <div class="col-12">
          <Textarea v-model="text" :autoResize="true" rows="10" cols="80" />
        </div>
      </div>
      <div class="row d-flex justify-content-between">
        <div class="col-4">
          <GeneralButton @click="resetTranslation" text="Cancel" colorHover="red"/>
        </div>
        <div class="col-4">
          <GeneralButton @click="sendTranslation()" text="Submit Translation"/>
        </div>
      </div>
    </div>
      <Dialog header="Empty translation" :visible="displayNoTranslationModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
          <p class="m-0">You provided an empty translation. <br/> Please provide one.</p>
          <template #footer>
              <Button label="Ok" icon="pi pi-check" @click="toggleDisplayNoTranslationModal" autofocus />
          </template>
      </Dialog>
      <Dialog header="Translation create with success" :visible="displayOkTranslationModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
          <p class="m-0">You created a translation successfully. <br/> Thank you.</p>
          <template #footer>
              <Button label="Ok" icon="pi pi-check" @click="closeDisplayOkTranslationModal" autofocus />
          </template>
      </Dialog>
  </div>
</template>

<script>
import Textarea from 'primevue/textarea'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import SentencesService from "../services/sentence.service";
import TranslationsService from "../services/translation.service";
import Menu from '@/components/Menu.vue'
import GeneralButton from '@/components/GeneralButton.vue'

export default {
  name: "Translation",
  components: {
    Menu,
    Textarea,
    Dialog,
    Button,
    GeneralButton
  },
  data() {
    return {
      content: "Translate",
      sentence: {},
      text: '',
      displayNoTranslationModal: false,
      displayOkTranslationModal: false
    };
  },
  methods: {
    sendTranslation(){
      if(this.text.length){
        TranslationsService.createTranslation(this.sentence.idsentence, this.text, parseInt(this.$route.params.idLanguageTo)).then(
          (response) => {
            this.toggleDisplayOkTranslationModal()
          },
          (error) => {
            console.log(error)
          }
        )
      } else {
        this.toggleDisplayNoTranslationModal()
      }
    },
    resetTranslation(){
      this.text=''
    },
    toggleDisplayNoTranslationModal() {
        this.displayNoTranslationModal = !this.displayNoTranslationModal
    },
    toggleDisplayOkTranslationModal(){
        this.displayOkTranslationModal = !this.displayOkTranslationModal
    },
    closeDisplayOkTranslationModal(){
      this.toggleDisplayOkTranslationModal()      
      this.$router.push('/translate')
    }
  },
  mounted(){
    SentencesService.getSentenceFromID(this.$route.params.idSentence).then(
      (response) => {
        this.sentence = response.data;
        if(this.sentence.languageId == this.$route.params.idLanguageTo){
          this.$router.push('/translate')
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }
};
</script>
<style scoped>
.w-80{
  width: 80%;
  margin: 1% 10%
}
</style>