<template>
  <div class="container">
    <Menu :isTranslator="true" :routesAvailable="['translate', 'review', 'alignment', 'profile']" />
    <div class="row h-100">
      <LanguageFilter optionLabel="title" optionValue="idlanguage" :options="languages" placeholder="Select a language" @changeFrom="changeFrom" @changeTo="changeTo"/>
      <div class="col-12">
        <AlignmentDataTable :languageFilter="languageFilter" @updatedLanguageFilter="updatedLanguageFilter"/>
      </div>
    </div>
  </div>  
</template>

<script>
import Menu from '@/components/Menu.vue'
import LanguageFilter from '@/components/DropdownFilterComponent.vue';
import AlignmentDataTable from '@/components/AlignmentDataTable.vue';

export default {
  name: "Alignment",
  components: {
    Menu,
    AlignmentDataTable,
    LanguageFilter
  },
  data() {
    return {
      content: "Alignment",
      languages: [],
      languageFilter: {        
        fromLanguageSelected: null,
        toLanguageSelected: null,
        update: false
      }
    };
  },
  methods:{
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
  },
  mounted(){
    this.languages = this.$store.getters['language/getAllLanguagesKnownByUser']
  }
};
</script>
<style scoped>
  .col-3 {
    text-align: center;
  }
</style>