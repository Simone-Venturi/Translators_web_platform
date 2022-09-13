<template>    
      <div class="col-12">
        <p>{{currentAction}} sentences from 
          <Dropdown :optionLabel="optionLabel" :optionValue="optionValue" :options="options" :placeholder="placeholder" ref="from" @change="changeFrom"/>
          to 
          <Dropdown :optionLabel="optionLabel" :optionValue="optionValue" :options="options" :placeholder="placeholder" ref="to" @change="changeTo"/>
        </p>
      </div>
</template>
<script>
import Dropdown from '@/components/DropdownLayout.vue';
export default {
    components: {
        Dropdown
    },
    data(){
        return {            
            fromLanguageSelected: null,
            toLanguageSelected: null,
            routesAvailable: ['translate', 'review', 'alignment', 'profile', 'dataset', 'paralleltext']
        }
    },
    props: {
        options: {
            type: Array,
            default: null
        },
        optionLabel: {
            type: String,
            default: null
        },
        optionValue: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        }
    },
    methods:{
        changeFrom(){
        this.fromLanguageSelected = this.$refs.from.selected
        this.$emit('changeFrom', {id : this.fromLanguageSelected})
        },
        changeTo(){
        this.toLanguageSelected = this.$refs.to.selected
        this.$emit('changeTo', {id: this.toLanguageSelected})
        }
    },
    computed:{
        currentAction(){
            let action = this.routesAvailable.filter(route => this.$route.fullPath.includes(route))[0]
            return action.charAt(0).toUpperCase() + action.slice(1);
        }
    }
}
</script>

<style scoped>
p {
    text-align: center;
}
</style>