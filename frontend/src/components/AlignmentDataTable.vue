<template>
    <div class="datatable">
        <DataTable :value="alignments" :paginator="true" class="p-datatable-alignments" :rows="10" dataKey="idtranslation" filterDisplay="menu" :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" responsiveLayout="scroll">
            <template #header>
                 <div class="flex justify-content-center align-items-center">
                    <h5 class="m-0">Alignments</h5>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
                 </div>
            </template>
            <template #empty>
                No alignments found.
            </template>
            <template #loading>
                Loading alignments. Please wait.
            </template>
            <Column field="originalText" header="Original Text" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.originalText}}
                </template>
            </Column>
            <Column field="translatedText" header="Translated Text" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.translatedText}}
                </template>
            </Column>
            <Column headerStyle="min-width: 8rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                <template #body="{data}">
                    <GeneralButton text="Align" @click="align(data.id)" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Column from 'primevue/column';
import GeneralButton from '@/components/GeneralButton.vue'
import AlignmentsService from "../services/alignment.service";
import {FilterMatchMode} from 'primevue/api';

export default {
    name: "AlignDataTableLayout",
    data() {
        return {
            allAlignments: null,
            alignments: null,
            filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
            },
            loading: true,
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
        Button,
        GeneralButton
    },
    mounted() {
        this.getAlignments();
    },
    watch: { 
      	'languageFilter.update': function(newVal) {
            if (newVal === true){
                this.alignments = this.allAlignments
                    .filter(alignment => {
                        if(this.languageFilter.fromLanguageSelected == null){
                            return true
                        } else {   
                            return alignment.originalLanguage == this.languageFilter.fromLanguageSelected
                        }
                    })
                    .filter(alignment => {
                        if(this.languageFilter.toLanguageSelected == null){
                            return true
                        } else {
                            return alignment.translatedLanguage == this.languageFilter.toLanguageSelected
                        }
                    })
                this.$emit('updatedLanguageFilter');
            }
        }
    },
    methods: {
        getAlignments(){            
            return AlignmentsService.getAllAlignments().then(result => {
                this.allAlignments = result.data;
                this.alignments = this.allAlignments;
                this.loading = false;
            })
        },
        align(idParallelText){
            this.$router.push('/alignment/'+idParallelText)
        },
        toggleDisplayNoReviewModal(){
            this.displayNoReviewModal = !this.displayNoReviewModal
        }
    }
}
</script>


<style scoped>
.dropdown {
    display: inline;
}
</style>