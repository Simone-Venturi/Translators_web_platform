<template>
  <div class="container">
    <Menu />
    <div class="w-60">
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
          <Textarea v-model="text" :autoResize="true" />
        </div>
      </div>
      <div class="row d-flex justify-content-between">
        <div class="col-4">
          <button @click="resetTranslation()">Cancel</button>
        </div>
        <div class="col-4">
          <button @click="sendTranslation()">Submit Translation</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Textarea from 'primevue/textarea'
import SentencesService from "../services/sentence.service";
import TranslationsService from "../services/translation.service";
import Menu from '@/components/Menu.vue'

export default {
  name: "Translation",
  components: {
    Menu,
    Textarea
  },
  data() {
    return {
      content: "Translate",
      sentence: {},
      text: ''
    };
  },
  methods: {
    sendTranslation(){
      if(this.text.length){
        TranslationsService.createTranslation(this.sentence.idsentence, this.text, parseInt(this.$route.params.idLanguageTo)).then(
          (response) => {
            console.log(response)
          },
          (error) => {
            console.log(error)
          }
        )
      }
    },
    resetTranslation(){
      this.text=''
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
.w-60{
  width: 60%;
  margin: 1% 20%
}
</style>