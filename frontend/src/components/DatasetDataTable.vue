<template>
    <div class="datatable">
        <DataTable :value="$store.getters['dataset/getAllDatasets']" :paginator="true" class="p-datatable-datasets" :rows="10" dataKey="idtranslation" :filters="filters" filterDisplay="menu" :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            :globalFilterFields="['name', 'URL']" responsiveLayout="scroll">
            <template #header>
                 <div  style="display:flex" class="flex justify-content-between">
                    <h5 class="m-0">Datasets</h5>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
                 </div>
            </template>
            <template #empty>
                No datasets found.
            </template>
            <template #loading>
                Loading datasets. Please wait.
            </template>
            <Column field="name" header="Name" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.name}}
                </template>
            </Column>
            <Column field="URL" header="URL" sortable style="min-width: 14rem">
                <template #body="{data}">
                    <a :href="data.URL" target="__blank" >{{data.URL}}</a>
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
import {FilterMatchMode} from 'primevue/api';

export default {
    name: "DatasetDataTableLayout",
    data() {
        return {
            datasets: null,
            filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
            },
            loading: false,
        }
    },
    components: {
        DataTable,
        Column,
        InputText,
        Button
    }
}
</script>


<style scoped>
.dropdown {
    display: inline;
}
</style>