<template>
  <div class="container">
    <div class="row h-100">
      <div class="col-12 m-2">
          <h3 class="p-2 m-1">Download translations</h3>
          <div style="display:block;align-items:baseline;" class="p-2 m-1">
            <label for="dataset-dropdown">Dataset</label>
            <Dropdown optionLabel="name" optionValue="id" :options="$store.getters['dataset/getAllDatasets']" ref="dataset" placeholder="select a dataset" @change="changeDataset" ariaLabelledBy="dataset-dropdown" />
          </div>
          <div style="display:block;align-items:baseline;" class="p-2 m-1">
            <label for="language-from">Translations from </label>
            <Dropdown optionLabel="title" optionValue="idlanguage" :options="this.$store.getters['language/getAllLanguagesKnownByUser']" ref="language_from" ariaLabelledBy="language-from" @change="changeLanguageFrom"/>
            <label for="language-to"> to </label>            
            <MultiSelect v-model="languagesTo" :options="this.$store.getters['language/getAllLanguagesKnownByUser']" optionLabel="title" placeholder="Select Languages" :filter="true" class="multiselect-custom" @change="changeLanguageTo">
                <template #value="slotProps">
                    <div class="language-item language-item-value" v-for="option of slotProps.value" :key="option.idlanguage">
                        <div>{{option.title}}</div>
                    </div>
                    <template v-if="!slotProps.value || slotProps.value.length === 0">
                        Select languages
                    </template>
                </template>
                <template #option="slotProps">
                    <div class="language-item">
                        <div>{{slotProps.option.title}}</div>
                    </div>
                </template>
            </MultiSelect>
            </div>
          <div style="display:block;align-items:baseline;" class="p-2 m-1">
            <label for="min-review-score">Translations must have an average review score between </label>
            <Dropdown optionLabel="val" optionValue="id" :options="$store.getters['dataset/getReviewValues']" ref="min_review_score" ariaLabelledBy="min-review-score"  @change="changeMinReviewValue"/>
            <label for="max-review-score"> and </label>
            <Dropdown optionLabel="val" optionValue="id" :options="$store.getters['dataset/getReviewValues']" ref="max_review_score" ariaLabelledBy="max-review-score"  @change="changeMaxReviewValue"/>
          </div>
          <!-- <div style="display:block;align-items:baseline;" class="p-2 m-1">
            <label for="binary">Translations with at least a review</label>
            <Checkbox inputId="binary" v-model="atLeastAReview" :binary="true" />
          </div> -->
          
          <div style="display:block;align-items:baseline;color:blue;" class="p-2 m-1" v-if="stima">
            Your request will produce {{recordsEstimated}} records
          </div>
          <div style="display:block;align-items:baseline;" class="p-2 m-1">
            <Button v-if="!stima" label="Check size" icon="pi pi-check" @click="checkSize" autofocus />
            <Button v-else  label="Download translations" icon="pi pi-check" @click="downloadDataset" autofocus />
          </div>
      </div>      
        <Dialog header="Error during download" :visible="displayErrorDownloadModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
            <p class="m-0">Download finished with an error. <br/> Please try again.</p>
            <template #footer>
                <Button label="Ok" icon="pi pi-check" @click="toggleDisplayErrorDownloadModal" autofocus />
            </template>
        </Dialog>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/DropdownLayout.vue'
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import DatasetsService from '@/services/dataset.service.js'

export default {
  name: "DataScientist",
  components: {
    Dropdown,
    InputText,
    MultiSelect,
    Checkbox,
    Button,
    Dialog
  },
  data(){
    return {
      atLeastAReview: false,
      stima: false,
      selectedDataset: null,
      languageFrom: null,
      languagesTo: null,
      minReviewScore: 0,
      maxReviewScore: 5,
      recordsEstimated: 0,
      displayErrorDownloadModal: false
    }
  },
  mounted() {
      this.$store.dispatch('dataset/readAllDatasets')
      this.$refs.min_review_score.selected = this.minReviewScore
      this.$refs.max_review_score.selected = this.maxReviewScore
  },
  methods: {
    changeDataset(){
      this.selectedDataset = this.$refs.dataset.selected
      this.resetStima()
    },
    changeMinReviewValue(){
      this.minReviewScore = this.$refs.min_review_score.selected
      this.resetStima()
    },
    changeMaxReviewValue(){
      this.maxReviewScore = this.$refs.max_review_score.selected
      this.resetStima()
    },
    changeLanguageFrom(){
      this.languageFrom = this.$refs.language_from.selected
      this.resetStima()
    },
    changeLanguageTo(){
      this.resetStima()
    },
    resetStima(){
      this.stima = false;
    },
    checkSize(){
      if(this.selectedDataset !== null && this.languageFrom !== null && this.languagesTo !== null){
        DatasetsService.checkDownloadSize(this.selectedDataset, this.languageFrom, this.languagesTo.map(language => language.idlanguage), this.minReviewScore, this.maxReviewScore, this.atLeastAReview)
          .then( res => {
            this.stima = !this.stima
            this.recordsEstimated = res.data.total
          })
      }
    },
    downloadDataset(){
      if(this.selectedDataset !== null && this.languageFrom !== null && this.languagesTo !== null){
        DatasetsService.downloadDataset(this.selectedDataset, this.languageFrom, this.languagesTo.map(language => language.idlanguage), this.minReviewScore, this.maxReviewScore, this.atLeastAReview)
          .then(response => {
            var blob = new Blob([response.data])
            let dataset_name = this.$store.getters['dataset/getAllDatasets'].filter(dataset => dataset.id == this.selectedDataset).map(dataset => dataset.name)[0]
            var link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = dataset_name+'.zip'
            link.click()
          })
          .catch(error => {
            toggleDisplayErrorDownloadModal()
          })
      }
    },
    toggleDisplayErrorDownloadModal(){
      this.displayErrorDownloadModal = ! this.displayErrorDownloadModal
    }
  }
};
</script>
<style scoped>
.col-12 *{
  text-align: left;
}
.row {
  margin: 0 !important;
  padding: 0 !important;
}
</style>