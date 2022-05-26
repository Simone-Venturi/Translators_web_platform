<template>
  <div class="container">
    <div class="row ml-4 mr-4">
      <div class="col-3">
        <button class="selected" @click="showTranslate">Translate</button>
      </div>
      <div class="col-3">
        <button class="not-selected" @click="showReview">Review</button>
      </div>
      <div class="col-3">
        <button class="not-selected" @click="showAlignment">Alignment</button>
      </div>
      <div class="col-3">
        <button class="not-selected" @click="showProfile">Profile</button>
      </div>
    </div>    
    <div class="row h-100">
      <h1>{{content}}</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: "Translate",
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
  button {
    width: 100%;
  }
  .selected {
    background-color: aqua;
  }
  .not-selected {
    background-color: transparent;
  }
</style>