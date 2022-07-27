<template>    
    <div class="row menu4button">
      <div class="col-3">
        <MenuButton class="menubutton" text="Translate" @click="showTranslate"/>
      </div>
      <div class="col-3">
        <MenuButton class="menubutton" text="Review" @click="showReview"/>
      </div>
      <div class="col-3">
        <MenuButton class="menubutton" text="Alignment" @click="showAlignment"/>
      </div>
      <div class="col-3">
        <MenuButton class="menubutton" text="Profile" @click="showProfile"/>
      </div>
    </div> 
</template>

<script>
import MenuButton from '@/components/MenuButton.vue'
export default {
    data() {
        return {
            content: null,
            routesAvailable: ['translate', 'review', 'alignment', 'profile']
        }
    },
    components: {
        MenuButton
    },
    methods: {        
        showTranslate(event){
            this.hadSelectedClassToSelectedButton(event)
        },
        showReview(event){
            this.hadSelectedClassToSelectedButton(event)
        },
        showAlignment(event){
            this.hadSelectedClassToSelectedButton(event)
        },
        showProfile(event){
            this.hadSelectedClassToSelectedButton(event)
        },
        hadSelectedClassToSelectedButton(event){
            this.$router.push('/'+event.target.innerText.toLowerCase())
        },
        selectCurrentButton(currentRoute){
            this.content = this.routesAvailable.filter(route => currentRoute.includes(route))[0]
            document.querySelectorAll(".menubutton").forEach(el => {
                if(el.innerText.toLowerCase() === this.content){
                    el.classList.remove("not-selected")
                    el.classList.add("selected")
                } else {
                    el.classList.add("not-selected")
                    el.classList.remove("selected")
                }
            })
        },
    },
    mounted() {
        this.selectCurrentButton(this.$route.fullPath)
    }
}
</script>

<style scoped>
  .col-3 {
    text-align: center;
  }
  .menu4button{
    margin: 2% 0%;
  }
</style>