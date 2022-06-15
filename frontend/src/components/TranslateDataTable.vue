<template>
    <div class="datatable">
        <DataTable :value="sentences" :paginator="true" class="p-datatable-sentences" :rows="10" dataKey="idsentence" filterDisplay="menu" :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            :globalFilterFields="['sentence']" responsiveLayout="scroll">
            <template #header>
                 <div class="flex justify-content-center align-items-center">
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
            <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                <template #body="{data}">
                    <button type="button" @click="translate(data.idsentence)">Translate</button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Column from 'primevue/column';
import SentencesService from "../services/sentence.service";
import {FilterMatchMode} from 'primevue/api';

export default {
    name: "DataTableLayout",
    data() {
        return {
            allSentences: null,
            sentences: null,
            filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
            },
            loading: true
        }
    },
    props: {
        languageFrom: {
            type: Number,
            default: null
        },
        languageTo: {
            type: Number,
            default: null
        }
    },
    components: {
        DataTable,
        Column,
        InputText
    },
    mounted() {
        SentencesService.getAllSentences().then(result => {
            this.allSentences = result.data;
            this.sentences = result.data;
            this.loading = false;
        });
    },
    watch: { 
      	languageFrom: function(newVal, oldVal) {
          this.sentences = this.allSentences.filter(sentence => sentence.languageId === newVal)
        }
    },
    methods: {
        translate(idsentence){
            if(this.languageFrom === this.languageTo || this.allSentences.filter(sentence => sentence.idsentence === idsentence).languageId === this.languageTo){
                console.log("ERROR: SAME LANGUAGES SELECTED")
            } else if(this.languageTo === null) {
                console.log("ERROR: SELECT A LANGUAGE TO TRANSLATE")
            } else {
                this.$router.push('/translate/'+idsentence+'/'+this.languageTo)
            }
        },
    }
}
</script>


<style scoped>
.dropdown {
    display: inline;
}
</style>