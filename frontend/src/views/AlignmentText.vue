<template>
  <div class="container">
    <Menu />
    <div class="w-80">
      <div class="row ml-4 mr-4">
        <div class="col-12">
          <h2>Alignment</h2>
        </div>
      </div>
      <div class="row ml-4 mr-4">
        <div class="col-sm-12 col-md-6">
          <h3>Original text</h3>
          <ul>
            <li v-for="(element, index) in originalArraySentences" :key="index"> {{element}}</li>
          </ul>
        </div>
        <div class="col-sm-12 col-md-6">
          <h3>Translated text</h3>
          <ul>
            <li v-for="(element, index) in translatedArraySentences" :key="index"> {{element}}</li>
          </ul>
        </div>
      </div>
      <div class="row ml-4 mr-4">
        <div class="col-12">
          <Splitter>
            <SplitterPanel :minSize="40">
              <ParallelText :parallelText="parallelText.originalText"
                @addBlock="addBlock" @removeBlock="removeBlock"
              />
            </SplitterPanel>
            <SplitterPanel :minSize="40">
              <ParallelText :parallelText="parallelText.translatedText" :translated=true 
                @addBlock="addBlock" @removeBlock="removeBlock" @goUp="goUp" @goDown="goDown"
              />
            </SplitterPanel>
          </Splitter>
        </div>
      </div>
      <div class="row justify-content-end m-4">
        <div class="col-md-auto">
          <GeneralButton text="Cancel" colorHover="red" />
        </div>
        <div class="col-md-auto">
          <GeneralButton text="Align" @click="validateAlignment()" />
        </div>
      </div>
    </div>
    <Dialog header="Different number of sentences" :visible="displayDifferentLengthModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
        <p class="m-0">You tried to send an alignment with a different number of sentences. <br/> Do you want to send it anyway?</p>
        <template #footer>
            <Button label="Cancel" class="p-button-danger" icon="pi pi-exclamation-circle" @click="toggleDisplayDifferentLengthModal" autofocus />
            <Button label="Yes" icon="pi pi-check" @click="sendAlignment" autofocus />
        </template>
    </Dialog>
    <Dialog header="Text alignment success" :visible="displayAlignmentSuccededModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
        <p class="m-0">The text alignment procedure succeded.</p>
        <template #footer>
            <Button label="Ok" icon="pi pi-check" @click="goToAlignmentPage" autofocus />
        </template>
    </Dialog>
  </div>
</template>

<script>
import AlignmentsService from "../services/alignment.service";
import Menu from '@/components/Menu.vue'
import ParallelText from '@/components/ParallelText.vue'
import GeneralButton from '@/components/GeneralButton.vue'
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

export default {
  name: "Alignment",
  components: {
    Menu,
    ParallelText,
    GeneralButton,
    Button,
    Dialog,
    Splitter,
    SplitterPanel
  },
  data() {
    return {
      content: "Alignment",
      parallelText: {},
      originalArraySentences: [],
      translatedArraySentences: [],
      displayDifferentLengthModal: false,
      displayAlignmentSuccededModal: false
    }
  },
  methods: {
    addBlock(event){
      if(event.translated){
        let list = this.splitParallelTextIntoSentence(this.parallelText.translatedText)
        this.parallelText.translatedText = this.addEmptySentenceInArrayAtPosition(list, event.index).join('')
      } else {
        let list = this.splitParallelTextIntoSentence(this.parallelText.originalText)
        this.parallelText.originalText = this.addEmptySentenceInArrayAtPosition(list, event.index).join('')
      }
    },
    removeBlock(event){
      if(event.translated){
        let list = this.splitParallelTextIntoSentence(this.parallelText.translatedText)
        this.parallelText.translatedText = this.removeSentenceInArrayAtPosition(list, event.index).join('')
      } else {
        let list = this.splitParallelTextIntoSentence(this.parallelText.originalText)
        this.parallelText.originalText = this.removeSentenceInArrayAtPosition(list, event.index).join('')
      }
    },
    goUp(event){
      if(event.translated){
        let list = this.splitParallelTextIntoSentence(this.parallelText.translatedText)
        let element = list.splice(event.index, 1)[0]
        list.splice(event.index -1, 0, element)
        this.parallelText.translatedText = list.join('')
      } else {
        // let list = this.splitParallelTextIntoSentence(this.parallelText.originalText)
        // let element = list.splice(event.index, 1)[0]
        // list.splice(event.index -1, 0, element)
        // this.parallelText.originalText = list.join('')
      }
    },
    goDown(event){
      if(event.translated){
        let list = this.splitParallelTextIntoSentence(this.parallelText.translatedText)
        let element = list.splice(event.index, 1)[0]
        list.splice(event.index +1, 0, element)
        this.parallelText.translatedText = list.join('')
      } else {
        // let list = this.splitParallelTextIntoSentence(this.parallelText.originalText)
        // let element = list.splice(event.index, 1)[0]
        // list.splice(event.index +1, 0, element)
        // this.parallelText.originalText = list.join('')
      }
    },
    validateAlignment(){
      let originalTextList = this.splitParallelTextIntoSentence(this.parallelText.originalText)
      let translatedTextList = this.splitParallelTextIntoSentence(this.parallelText.translatedText)
      if(originalTextList.length != translatedTextList.length){
        this.toggleDisplayDifferentLengthModal()
      } else {
        this.sendAlignment()
      }
    },
    sendAlignment(){
      if(this.displayDifferentLengthModal){
        this.toggleDisplayDifferentLengthModal()
      }
      let originalTextList = this.splitParallelTextIntoSentence(this.parallelText.originalText)
      let translatedTextList = this.splitParallelTextIntoSentence(this.parallelText.translatedText)
      let translationObjectsArray = []
      let sentenceArrayOriginal = []
      let sentenceArrayTranslated = []
      originalTextList.forEach((element, index) => {
        if (translatedTextList[index] != element){
          if(translatedTextList[index] == this.$store.getters['sentence/getEmptyStringElement']){
            sentenceArrayOriginal.push(element)
          } else if(element == this.$store.getters['sentence/getEmptyStringElement']){
            sentenceArrayTranslated.push(translatedTextList[index])
          } else {
            translationObjectsArray.push({
              original_sentence: element,
              translated_sentence: translatedTextList[index]
            })
          }
        }
      });
      AlignmentsService.createAlignment(this.$route.params.idParallelText, translationObjectsArray, sentenceArrayOriginal, sentenceArrayTranslated).then(
        (response) => {
          this.toggleDisplayAlignmentSuccededModal()
        },
        (error) => {
          console.log(error)
        }
      )
    },
    goToAlignmentPage(){
      this.toggleDisplayAlignmentSuccededModal()
      this.$router.push('/alignment')
    },
    splitParallelTextIntoSentence(parallelText){
      return parallelText.match(this.$store.getters['sentence/getRegex'])
    },
    addEmptySentenceInArrayAtPosition(array, index){
      return [...array.slice(0,index), this.$store.getters['sentence/getEmptyStringElement'], ...array.slice(index)]
    },
    removeSentenceInArrayAtPosition(array, index){
      return [...array.slice(0, index), ...array.slice(index + 1)]
    },
    toggleDisplayDifferentLengthModal(){
       this.displayDifferentLengthModal = !this.displayDifferentLengthModal
    },
    toggleDisplayAlignmentSuccededModal(){
       this.displayAlignmentSuccededModal = !this.displayAlignmentSuccededModal
    }
  },
  mounted(){
    AlignmentsService.getAlignmentFromID(this.$route.params.idParallelText).then(
      (response) => {
        this.parallelText = response.data;
      },
      (error) => {
        console.log(error)
      }
    );
  },
  watch:{
    'parallelText.originalText': function(newVal) {
      this.originalArraySentences = this.splitParallelTextIntoSentence(newVal)
    },
    'parallelText.translatedText': function(newVal) {
      this.translatedArraySentences = this.splitParallelTextIntoSentence(newVal)
    }
  }
};
</script>
<style scoped>
.w-80{
  width: 80%;
  margin: 1% 10%
}
@media only screen and (max-width: 600px) {
  .w-80{
    width: 100%;
    margin: 1% 0%
  }
}
ul {
  list-style-type: none;
  padding: 0;
}
.p-component {
  max-height: 500px;
  overflow: hidden;
}
.p-splitter-panel {
  overflow-y: scroll;
}
</style>