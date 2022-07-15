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
              <p>{{parallelText.originalText}}</p>
            </SplitterPanel>
            <SplitterPanel>
              <p>{{parallelText.translatedText}}</p>
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
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

export default {
  name: "Translation",
  components: {
    Menu,
    Splitter,
    SplitterPanel
  },
  data() {
    return {
      content: "Alignment",
      parallelText: {},
      originalTextList: [],
      translatedTextList: []
    }
  },
  methods: {
  },
  mounted(){
    AlignmentsService.getAlignmentFromID(this.$route.params.idParallelText).then(
      (response) => {
        this.parallelText = response.data;
        let regex = new RegExp(/[^.?!]+[.!?]+[\])'"`’”]*|.+/, 'g');
        this.originalTextList = this.parallelText.originalText.match(regex)
        this.translatedTextList = this.parallelText.translatedText.match(regex)
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