<template>
    <div>
        <div class="row">
            <div class="col-1">
                <p>{{index}}</p>
            </div>
            <div class="col-10">
                <p>{{showSentenceText}}</p>
            </div>
            <div v-if="translated" class="col-1">
                <div class="d-flex flex-column">
                    <div class="clickable" v-if="!isFirst" @click="goUp(index)"><i class="pi pi-arrow-circle-up"></i></div>
                    <div class="clickable" v-if="!isEmptyTranslation()" @click="addBlock(index)"><i class="pi pi-plus-circle"></i></div>
                    <div class="clickable" v-else @click="removeBlock(index)"><i class="pi pi-minus-circle"></i></div>
                    <div class="clickable" v-if="!isLast" @click="goDown(index)"><i class="pi pi-arrow-circle-down"></i></div>
                </div>
            </div>
        </div>
        <Divider v-if="!isLast"/>    
    </div>
</template>
<script>
import Divider from 'primevue/divider';
export default {
    components:{
        Divider
    },
    props: {
        index: {
            type: Number,
            default: null
        },
        sentence: {
            type: String
        },
        translated: {
            type: Boolean,
            default: false
        },
        isFirst: {
            type: Boolean,
            default: false
        },
        isLast: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        addBlock(index){
            this.$emit('addBlock', {index: index})
        },
        removeBlock(index){
            this.$emit('removeBlock', {index: index})
        },
        goUp(index){
            this.$emit('goUp', {index: index})
        },
        goDown(index){
            this.$emit('goDown', {index: index})
        },
        isEmptyTranslation(){
            return this.sentence == ' .'
        }
    },
    computed: {
        showSentenceText(){
            return this.isEmptyTranslation() ? 'Empty translation' : this.sentence;
        }
    }
}
</script>
<style scoped>
.clickable:hover {
    cursor:pointer;
}
</style>