<template>
    <div class="dropdown">
        <Dropdown v-model="selected" :options="options" :optionLabel="optionLabel" :filter="true" :optionValue="optionValue" :placeholder="placeholder" @change="changeValue"/>
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
        optionValue: {
            type: String,
            default: "value",
        },
        placeholder: {
            type: String,
            default: "select..",
        },
        options: { 
            type: Array, 
            default: null,
        }
    },
    methods:{
        changeValue(event){
            this.selected = event.value
            this.$emit('change')
        }
    }
}
</script>


<style scoped>
.dropdown {
    display: inline;
}
</style>