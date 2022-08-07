<template>
  <div class="container">
    <div class="row h-100">
      <div class="col-12">
        <DatasetDataTable />
      </div>      
      <div class="col-12">
        <h3>Create a new Dataset</h3>
        <label for="new_dataset_name">Name</label> <input type="text" id="new_dataset_name" v-model="datasetName" />
        <label for="new_dataset_url">URL</label> <input type="text" id="new_dataset_url" v-model="datasetURL" />
        <GeneralButton text="create" @click="createDataset"/>
      </div>
    </div>
  </div>
</template>

<script>
import DatasetDataTable from '@/components/DatasetDataTable.vue';
import GeneralButton from '@/components/GeneralButton.vue'
export default {
  name: "Admin",
  components: {
    DatasetDataTable,
    GeneralButton
  },
  data(){
    return {
      datasetName: null,
      datasetURL: null,
    }
  },
  mounted() {
      this.$store.dispatch('dataset/readAllDatasets');
  },
  methods: {
    createDataset(){
      return this.$store.dispatch('dataset/createDataset', {datasetName: this.datasetName, datasetURL: this.datasetURL})
    }
  }
};
</script>