<template>
    <div class="datatable">
        <DataTable :value="sentences" :paginator="true" class="p-datatable-sentences" :rows="10" dataKey="idsentence" :filters="filters" filterDisplay="menu" :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            :globalFilterFields="['sentence']" responsiveLayout="scroll">
            <template #header>
                 <div  style="display:flex" class="flex justify-content-between">
                    <h5 class="m-0">Sentences</h5>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
                 </div>
            </template>
            <template #empty>
                No sentences found.
            </template>
            <template #loading>
                Loading sentences. Please wait.
            </template>
            <Column field="sentence" header="Sentences" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.sentence}}
                </template>
            </Column>
            <Column headerStyle="min-width: 10rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                <template #body="{data}">
                    <GeneralButton text="Translate" @click="translate(data.idsentence)" />
                </template>
            </Column>
        </DataTable>
        <Dialog header="Same language selected" :visible="displaySameLanguagesModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
            <p class="m-0">You tried to translate a sentence to the same language is written. <br/> Please select an other one.</p>
            <template #footer>
                <Button label="Ok" icon="pi pi-check" @click="toggleDisplaySameLanguagesModal" autofocus />
            </template>
        </Dialog>
        <Dialog header="No language selected" :visible="displayNoLanguagesModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
            <p class="m-0">You tried to translate a sentence without select a language. <br/> Please select a language.</p>
            <template #footer>
                <Button label="Ok" icon="pi pi-check" @click="toggleDisplayNoLanguagesModal" autofocus />
            </template>
        </Dialog>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import GeneralButton from '@/components/GeneralButton.vue'
import SentencesService from "../services/sentence.service";
import {FilterMatchMode} from 'primevue/api';

export default {
    name: "DataTableLayout",
    data() {
        return {
            sentences: null,
            filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
            },
            loading: true,            
            displaySameLanguagesModal: false,
            displayNoLanguagesModal: false
        }
    },
    props: {
        languageFilter: {
            type: Object,
            default: null
        }
    },
    components: {
        DataTable,
        Column,
        InputText,
        Dialog,
        Button,
        GeneralButton
    },
    watch: { 
      	'languageFilter.update': function(newVal) {
            if (newVal === true && this.languageFilter.fromLanguageSelected !== null){
                this.updateSentences()
            } else {
                this.$emit('updatedLanguageFilter');
            }
        }
    },
    mounted(){
        this.updateSentences()
    },
    methods: {
        translate(idsentence){
            if((this.languageFilter.fromLanguageSelected === this.languageFilter.toLanguageSelected && this.languageFilter.fromLanguageSelected !== null) || this.sentences.filter(sentence => sentence.idsentence === idsentence)[0].languageId === this.languageFilter.toLanguageSelected){
                this.toggleDisplaySameLanguagesModal()
            } else if(this.languageFilter.toLanguageSelected === null) {
                this.toggleDisplayNoLanguagesModal()
            } else {
                this.$router.push('/translate/'+idsentence+'/'+this.languageFilter.toLanguageSelected)
            }
        },
        toggleDisplaySameLanguagesModal() {
            this.displaySameLanguagesModal = !this.displaySameLanguagesModal
        },
        toggleDisplayNoLanguagesModal() {
            this.displayNoLanguagesModal = !this.displayNoLanguagesModal
        },
        updateSentences(){
            SentencesService.getAllSentencesFromLanguageToTranslate(this.languageFilter.fromLanguageSelected, this.languageFilter.toLanguageSelected).then(result => {
                this.sentences = result.data;
                this.loading = false;
                this.$emit('updatedLanguageFilter');
            });
        }
    }
}
</script>


<style scoped>
.dropdown {
    display: inline;
}
</style>