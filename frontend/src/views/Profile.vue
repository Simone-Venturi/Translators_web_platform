<template>
  <div class="container">
    <Menu />
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <div class="row">
            <div class="col-12 col-sm-12">
              <i class="pi pi-user"></i>
            </div>
            <div class="col-12 col-sm-12">
              <h3>Biography</h3>
              <p>
                <strong>Username:</strong>
                {{currentUser.username}}
              </p>
              <p>
                <strong>Email:</strong>
                {{currentUser.email}}
              </p>
              <p>
                <strong>Languages:</strong>
                <ul class="p-0">
                  <li v-for="language in languagesKnown" :key="language.idlanguage">{{language.title}}</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-9">
          <div class="row">
            <div class="col-12 col-sm-12">
              <h4>Expertises</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelect from 'primevue/multiselect';
import Menu from '@/components/Menu.vue'
import LanguageService from "../services/language.service"

export default {
  name: 'Profile',
  components: {
    Menu,
    MultiSelect
  },
  data(){
    return {
      allLanguages: null,
      languagesKnown: null,
      languagesKnown2: null
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    } else {      
      LanguageService.getAllLanguagesFilteredByUser().then(
        (response) => {
          this.languagesKnown = response.data;
        },
        (error) => {
          console.log(error)
        }
      );
    }
    LanguageService.getAllLanguages().then(
        (response) => {
          this.allLanguages = response.data;
          console.log(this.allLanguages)
        },
        (error) => {
          console.log(error)
        }
      );
  }
};
</script>
<style scoped>
ul {list-style-type: none;}
i {
  font-size: 500%;
  margin: 5%;
}
.p-multiselect {
    width: 70%;
}
.p-multiselect-label:not(.p-placeholder) {
    padding-top: .25rem;
    padding-bottom: .25rem;
}

.language-item-value {
    padding: .25rem .5rem;
    border-radius: 3px;
    display: inline-flex;
    margin-right: .5rem;
    background-color: var(--primary-color);
    color: var(--primary-color-text);
}
</style>