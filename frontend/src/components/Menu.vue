<template>    
    <div v-if="isAdmin" class="row menu4button">
      <div class="col-3">
        <MenuButton class="menubutton" text="Dataset" @click="showDataset"/>
      </div>
      <div class="col-3">
        <MenuButton class="menubutton" text="ParallelText" @click="showParallelText"/>
      </div>
    </div>
    <div v-else-if="isTranslator" class="row menu4button">
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
            content: null
        }
    },
    props: {
      isAdmin: {
        type: Boolean,
        default: false
      },
      isTranslator: {
        type: Boolean,
        default: false
      },
      routesAvailable: {
        type: Array
      }
    },
    components: {
        MenuButton
    },
    methods: {
        showDataset(event){
            this.hadSelectedClassToSelectedButton(event)
        },
        showParallelText(event){
            this.hadSelectedClassToSelectedButton(event)
        },
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
    align-items: center;
    justify-content: center;
  }
  @media only screen and (max-width: 600px) {
    .col-3 {
      display: block;
      padding: 0%;
    }
  }
</style>