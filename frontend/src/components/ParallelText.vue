<template>
    <div class="container">
        <ParallelTextSentence v-for="(sentence, key) in textList" :key="key" 
            :sentence="sentence" :index="key" :translated="translated" :isFirst="key==0" :isLast="key+1==textList.length"
            @addBlock="addBlock" @goUp="goUp" @goDown="goDown"
        />
    </div>
</template>
<script>
import ParallelTextSentence from '@/components/ParallelTextSentence.vue'
export default {
    components:{
        ParallelTextSentence
    },
    data(){
        return {
            textList: []
        }
    },
    props: {
        parallelText: {
            type: String,
            default: null
        },
        translated: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        'parallelText': function(newVal) {
            let regex = new RegExp(/[^.?!]+[.!?]+[\])'"`’”]*|.+/, 'g');
            this.textList = newVal.match(regex)
        }
    },
    methods: {
        addBlock(event){
            this.$emit('addBlock', {index: event.index, translated: this.translated})
        },
        goUp(event){
            this.$emit('goUp', {index: event.index, translated: this.translated})
        },
        goDown(event){
            this.$emit('goDown', {index: event.index, translated: this.translated})
        },
    }
}
</script>