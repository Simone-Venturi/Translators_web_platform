<template>
    <div class="datatable">
        <DataTable :value="translations" :paginator="true" class="p-datatable-translations" :rows="10" dataKey="idtranslation" filterDisplay="menu" :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            :globalFilterFields="['original_sentence', 'translated_sentence']" responsiveLayout="scroll">
            <template #header>
                 <div class="flex justify-content-center align-items-center">
                    <h5 class="m-0">Translations</h5>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
                 </div>
            </template>
            <template #empty>
                No translations found.
            </template>
            <template #loading>
                Loading translations. Please wait.
            </template>
            <Column field="original_sentence" header="Sentences" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.OriginalSentence.sentence}}
                </template>
            </Column>
            <Column field="translated_sentence" header="Translations" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.TranslatedSentence.sentence}}
                </template>
            </Column>
            <Column field="rate_sentence" header="Rating" style="min-width: 14rem">
                <template #body="{data}">
                    <div style="display:inline-flex;">
                        <rate :length="5" v-model="data.score_review" /> <span>({{data.n_scores}})</span>
                    </div>
                </template>
            </Column>
            <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                <template #body="{data}">
                    <GeneralButton text="Rate" @click="rate(data.id)" />
                </template>
            </Column>
        </DataTable>
        <Dialog header="Empty review" :visible="displayNoReviewModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
            <p class="m-0">You provided an empty review. <br/> Please provide one.</p>
            <template #footer>
                <Button label="Ok" icon="pi pi-check" @click="toggleDisplayNoReviewModal" autofocus />
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
import TranslationsService from "../services/translation.service";
import ReviewsService from "../services/review.service";
import {FilterMatchMode} from 'primevue/api';

export default {
    name: "ReviewDataTableLayout",
    data() {
        return {
            allTranslations: null,
            translations: null,
            filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
            },
            loading: true,
            displayNoReviewModal: false
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
        InputText,
        Dialog,
        Button,
        GeneralButton
    },
    mounted() {
        TranslationsService.getAllTranslations().then(result => {
            this.allTranslations = result.data;
            this.allTranslations = this.allTranslations.map(translation => ({...translation, score_review: null}));
            this.translations = this.allTranslations;
            this.loading = false;
        });
    },
    watch: { 
      	languageFrom: function(newVal, oldVal) {
            this.translations = this.allTranslations
                .filter(translation => translation.OriginalSentence.languageId === newVal)
                .filter(translation => {
                    if(this.languageTo == null){
                        return true
                    } else {
                        return translation.TranslatedSentence.languageId == this.languageTo
                    }
                })
        },
        languageTo: function(newVal, oldVal) {
            this.translations = this.allTranslations
                .filter(translation => translation.TranslatedSentence.languageId === newVal)            
                .filter((translation) => {
                    if(this.languageFrom == null){
                        return true
                    } else {
                        return translation.OriginalSentence.languageId == this.languageFrom
                    }
                })
        }
    },
    methods: {
        rate(id){
            let translation = this.translations.filter(translation => translation.id === id)[0]
            if(translation.score_review !== null){
                ReviewsService.createReview(translation.id, translation.score_review).then(
                (response) => {
                    console.log(response)
                },
                (error) => {
                    console.log(error)
                }
                )
            } else {
                this.toggleDisplayNoReviewModal()
            }
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