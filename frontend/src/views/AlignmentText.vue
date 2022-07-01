<template>
  <div class="container">
    <Menu />
    <div class="w-80">
      <div class="row ml-4 mr-4">
        <div class="col-12">
          <h2>Alignment</h2>
        </div>
      </div>
    </div>      
  </div>
</template>

<script>
import AlignmentsService from "../services/alignment.service";
import Menu from '@/components/Menu.vue'

export default {
  name: "Translation",
  components: {
    Menu
  },
  data() {
    return {
      content: "Alignment",
      parallelText: {},
    };
  },
  methods: {
  },
  mounted(){
    AlignmentsService.getAlignmentFromID(this.$route.params.idParallelText).then(
      (response) => {
        this.parallelText = response.data;
        if(this.parallelText.originalLanguage == this.$route.params.idLanguageTo){
          this.$router.push('/alignment')
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }
};
</script>
<style scoped>
.w-80{
  width: 80%;
  margin: 1% 10%
}
</style>