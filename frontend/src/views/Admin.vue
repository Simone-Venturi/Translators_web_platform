<template>
  <div class="container">
    <div class="row h-100">
      <div class="col-12 m-2">
        <h3>All Datasets</h3>
        <DatasetDataTable />
      </div>
      <div class="col-12 m-2">
        <h3>Create a new Dataset</h3>
        <div class="d-flex flex-wrap justify-content-start">
          <span class="p-float-label m-4">
            <InputText id="new_dataset_name" type="text" v-model="datasetName" class="p-inputtext-lg" />
            <label for="new_dataset_name">Name</label>
          </span>
          <span class="p-float-label m-4">
            <InputText id="new_dataset_url" type="text" v-model="datasetURL" class="p-inputtext-lg" />
            <label for="new_dataset_url">URL</label>
          </span>
          <Button class="m-4" label="Create" @click="createDataset"/>
        </div>
      </div>
      <div class="col-12 m-2">
        <h3>Load tmx resources of an existing Dataset</h3>
          <div style="display:inline-flex;align-items:baseline;">
            <label for="dataset-dropdown" class="m-2 p-2">Dataset</label>
            <Dropdown optionLabel="name" optionValue="id" :options="$store.getters['dataset/getAllDatasets']" ref="dataset" placeholder="select a dataset" @change="changeDataset" ariaLabelledBy="dataset-dropdown" />
          </div>
          <FileUpload name="dataset[]" accept=".tmx" :customUpload="true" :multiple="true" @uploader="onUpload">
            <template #empty>
                  <p>Drag and drop files to here to upload.</p>
              </template>
          </FileUpload>
        <Dialog header="Completed load" :visible="displayCompletedLoadModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
            <p class="m-0">You provided {{total_records}} records. <br/> {{translation_created}} records are created.  <br/> {{translation_not_created}} records generate an error.</p>
            <template #footer>
                <Button label="Ok" icon="pi pi-check" @click="toggleDisplayCompletedLoadModal" autofocus />
            </template>
        </Dialog>
        <Dialog header="Error load" :visible="displayErrorLoadModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
            <p class="m-0">An error occurred.</p>
            <template #footer>
                <Button label="Ok" icon="pi pi-check" @click="toggleDisplayErrorLoadModal" autofocus />
            </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import DatasetDataTable from '@/components/DatasetDataTable.vue';
import Dropdown from '@/components/DropdownLayout.vue'
import GeneralButton from '@/components/GeneralButton.vue'
import FileUpload from 'primevue/fileupload';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import DatasetsService from '@/services/dataset.service.js'

export default {
  name: "Admin",
  components: {
    DatasetDataTable,
    Dropdown,
    GeneralButton,
    FileUpload,
    Dialog,
    Button,
    InputText
  },
  data(){
    return {
      datasetName: null,
      datasetURL: null,
      selectedDataset: null,
      translation_created: 0,
      translation_not_created: 0,
      total_records: 0,
      displayCompletedLoadModal: false,
      displayErrorLoadModal: false
    }
  },
  mounted() {
      this.$store.dispatch('dataset/readAllDatasets');
  },
  methods: {
    createDataset(){
      return this.$store.dispatch('dataset/createDataset', {datasetName: this.datasetName, datasetURL: this.datasetURL})
        .then(() => {          
          this.datasetName = null
          this.datasetURL = null
        })
    },    
    onUpload(event) {
      if(this.selectedDataset != null){
        this.translation_created = 0
        this.translation_not_created = 0
        this.total_records = 0
        Promise.all(event.files.map(async file => {
          await DatasetsService
            .loadResourceDataset(this.selectedDataset, file)
            .then((res) => {
              this.translation_created += res.data.translation_created,
              this.translation_not_created += res.data.translation_not_created,
              this.total_records += res.data.total_records
            })
        }))
        .then((risposta) => {
          this.toggleDisplayCompletedLoadModal()
        })
        .catch((error) => {
          this.toggleDisplayErrorLoadModal()
        })
      }
    },    
    changeDataset(){
      this.selectedDataset = this.$refs.dataset.selected
    },
    toggleDisplayCompletedLoadModal(){
        this.displayCompletedLoadModal = !this.displayCompletedLoadModal
    },
    toggleDisplayErrorLoadModal(){
        this.displayErrorLoadModal = !this.displayErrorLoadModal
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