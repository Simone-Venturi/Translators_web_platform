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
        <div class="col-6">
          <h3>Original text:</h3>
          <p>{{parallelText.originalText}}</p>
        </div>
        <div class="col-6">
          <h3>Translated text:</h3>
          <p>{{parallelText.translatedText}}</p>
        </div>
      </div>
      <div class="row ml-4 mr-4">
        <div class="col-12">
          <Splitter style="height: 300px">
            <SplitterPanel>
              <ParallelText :parallelText="parallelText.originalText" 
                @goUp="goUp" @goDown="goDown"
              />
            </SplitterPanel>
            <SplitterPanel>
              <ParallelText :parallelText="parallelText.translatedText" :translated=true 
                @addBlock="addBlock" @removeBlock="removeBlock" @goUp="goUp" @goDown="goDown"
              />
            </SplitterPanel>
          </Splitter>
        </div>
      </div>
    </div>      
  </div>
</template>

<script>
import AlignmentsService from "../services/alignment.service";
import Menu from '@/components/Menu.vue'
import ParallelText from '@/components/ParallelText.vue'
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

export default {
  name: "Translation",
  components: {
    Menu,
    ParallelText,
    Splitter,
    SplitterPanel
  },
  data() {
    return {
      content: "Alignment",
      regex: new RegExp(/[^.?!]+[.!?]+[\])'"`’”]*|.+/, 'g'),
      emptyElement: ' .',
      parallelText: {},
      originalTextList: [],
      translatedTextList: []
    }
  },
  methods: {
    addBlock(event){
      if(event.translated){
        let list = this.splitParallelTextIntoSentence(this.parallelText.translatedText)
        this.parallelText.translatedText = this.addEmptySentenceInArrayAtPosition(list, event.index).join('')
      } else {

      }
    },
    removeBlock(event){
      if(event.translated){
        let list = this.splitParallelTextIntoSentence(this.parallelText.translatedText)
        this.parallelText.translatedText = this.removeSentenceInArrayAtPosition(list, event.index).join('')
      } else {

      }
    },
    goUp(event){
      if(event.translated){
        let list = this.splitParallelTextIntoSentence(this.parallelText.translatedText)
        let element = list.splice(event.index, 1)[0]
        list.splice(event.index -1, 0, element)
        this.parallelText.translatedText = list.join('')
      } else {
        let list = this.splitParallelTextIntoSentence(this.parallelText.originalText)
        let element = list.splice(event.index, 1)[0]
        list.splice(event.index -1, 0, element)
        this.parallelText.originalText = list.join('')
      }
    },
    goDown(event){
      if(event.translated){
        let list = this.splitParallelTextIntoSentence(this.parallelText.translatedText)
        let element = list.splice(event.index, 1)[0]
        list.splice(event.index +1, 0, element)
        this.parallelText.translatedText = list.join('')
      } else {
        let list = this.splitParallelTextIntoSentence(this.parallelText.originalText)
        let element = list.splice(event.index, 1)[0]
        list.splice(event.index +1, 0, element)
        this.parallelText.originalText = list.join('')
      }
    },
    splitParallelTextIntoSentence(parallelText){
      return parallelText.match(this.regex)
    },
    addEmptySentenceInArrayAtPosition(array, index){
      return [...array.slice(0,index), this.emptyElement, ...array.slice(index)]
    },
    removeSentenceInArrayAtPosition(array, index){
      return [...array.slice(0, index), ...array.slice(index + 1)]
    }
  },
  mounted(){
    AlignmentsService.getAlignmentFromID(this.$route.params.idParallelText).then(
      (response) => {
        this.parallelText = response.data;
        this.originalTextList = this.splitParallelTextIntoSentence(this.parallelText.originalText)
        this.translatedTextList = this.splitParallelTextIntoSentence(this.parallelText.translatedText)
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