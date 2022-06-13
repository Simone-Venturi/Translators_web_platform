<template>
    <div class="dropdown">
        <Dropdown v-model="selected" :options="options" :optionLabel="optionLabel" :filter="true" :placeholder="placeholder" />
    </div>
</template>

<script>
import Dropdown from 'primevue/dropdown'; 

export default {
    name: "DropdownLayout",
    data() {
        return {
            selected: null,
        }
    },
    components: {
        Dropdown
    },
    props: {
        optionLabel: {
            type: String,
            default: "name",
        },
        placeholder: {
            type: String,
            default: "select..",
        },
        options: { 
            type: Array, 
            default: null,
        }
    }
}
</script>


<style scoped>
.dropdown {
    display: inline;
}
</style>