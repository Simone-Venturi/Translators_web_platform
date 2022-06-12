<template>
  <div class="container">
    <div class="row ml-4 mr-4">
      <div class="col-3">
        <MenuButton text="Translate" @click="showTranslate"/>
      </div>
      <div class="col-3">
        <MenuButton text="Review" @click="showReview"/>
      </div>
      <div class="col-3">
        <MenuButton text="Alignment" @click="showAlignment"/>
      </div>
      <div class="col-3">
        <MenuButton text="Profile" @click="showProfile"/>
      </div>
    </div>    
    <div class="row h-100">
      <h1>{{content}}</h1>
    </div>
  </div>
</template>

<script>
import MenuButton from '@/components/MenuButton.vue'

export default {
  name: "Translate",
  components: {
    MenuButton
  },
  data() {
    return {
      content: "Translate",
    };
  },
  methods:{
    showTranslate(event){
      this.hadSelectedClassToSelectedButton(event)
      this.content = 'Translate'
    },
    showReview(event){
      this.hadSelectedClassToSelectedButton(event)
      this.content = 'Review'
    },
    showAlignment(event){
      this.hadSelectedClassToSelectedButton(event)
      this.content = 'Alignment'
    },
    showProfile(event){
      this.hadSelectedClassToSelectedButton(event)
      this.content = 'Profile'
    },
    hadSelectedClassToSelectedButton(event){
       document.querySelectorAll("button").forEach(el => {
         if(el === event.target){
            el.classList.remove("not-selected")
            el.classList.add("selected")
         } else {
            el.classList.add("not-selected")
            el.classList.remove("selected")
         }
      })
    }
  }
};
</script>
<style scoped>
  .col-3 {
    text-align: center;
  }
</style>