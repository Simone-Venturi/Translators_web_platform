<template>
  <div class="container">
    <div class="row h-100">
      <div class="col-12 m-2">
          <h3 class="p-2 m-1">Download translations</h3>
          <div style="display:block;align-items:baseline;" class="p-2 m-1">
            <label for="dataset-dropdown">Dataset</label>
            <MultiSelect v-model="datasets" :options="this.$store.getters['dataset/getAllDatasetsPlusTranslationDataset']" optionLabel="name" placeholder="Select a dataset" :filter="true" class="multiselect-custom" @change="changeDataset">
                <template #value="slotProps">
                    <div class="dataset-item dataset-item-value" v-for="option of slotProps.value" :key="option.id">
                        <div>{{option.name}}</div>
                    </div>
                    <template v-if="!slotProps.value || slotProps.value.length === 0">
                        Select datasets
                    </template>
                </template>
                <template #option="slotProps">
                    <div class="dataset-item">
                        <div>{{slotProps.option.name}}</div>
                    </div>
                </template>
            </MultiSelect>
          </div>
          <div style="display:block;align-items:baseline;" class="p-2 m-1">
            <label for="language">Translations in </label>       
            <MultiSelect v-model="languagesTo" :options="this.$store.getters['language/getAllLanguagesAvailable']" optionLabel="title" placeholder="Select Languages" :filter="true" class="multiselect-custom" @change="changeLanguageTo">
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
          <div style="display:block;align-items:baseline" class="p-2 m-1">
            <label for="nMinReviews">Translations must have </label>
            <InputNumber v-model="nMinReview" :min="0" :max="100" inputId="nMinReviews" />
            <label for="nMinReviews"> reviews at least</label>
          </div>          
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
import InputNumber from 'primevue/inputnumber';
import DatasetsService from '@/services/dataset.service.js'

export default {
  name: "DataScientist",
  components: {
    Dropdown,
    InputText,
    MultiSelect,
    Checkbox,
    Button,
    InputNumber,
    Dialog
  },
  data(){
    return {
      nMinReview: 0,
      stima: false,
      datasets: null,
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
      if(this.datasets !== null && this.languagesTo !== null && this.languagesTo.length >= 2){
        DatasetsService.checkDownloadSize(this.datasets.map(dataset => dataset.id), this.languagesTo.map(language => language.idlanguage), this.minReviewScore, this.maxReviewScore, this.nMinReview)
          .then( res => {
            this.stima = !this.stima
            this.recordsEstimated = res.data.total
          })
      }
    },
    downloadDataset(){
      if(this.datasets !== null && this.languagesTo !== null && this.languagesTo.length >= 2){
        DatasetsService.downloadDataset(this.datasets.map(dataset => dataset.id), this.languagesTo.map(language => language.idlanguage), this.minReviewScore, this.maxReviewScore, this.nMinReview)
          .then(response => {
            var blob = new Blob([response.data])
            let dataset_name = this.$store.getters['dataset/getAllDatasetsPlusTranslationDataset'].filter(dataset => this.datasets.map(dataset => dataset.id).includes(dataset.id)).map(dataset => dataset.name).join("-")
            var link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = dataset_name+'.zip'
            link.click()
          })
          .catch(error => {
            this.toggleDisplayErrorDownloadModal()
          })
          .finally(() => {
            this.resetStima()
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