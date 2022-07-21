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
              <div class="container">
                <div class="row">
                  <div class="col-12">                    
                    <h4>Expertises</h4>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">                    
                    <h5>Languages</h5>
                  </div>
                  <div class="col-9">
                    <MultiSelect v-model="languageFilter" :options="allLanguages" optionLabel="title" placeholder="Select Languages" :filter="true" class="multiselect-custom">
                        <template #value="slotProps">
                            <div class="language-item language-item-value" v-for="option of slotProps.value" :key="option.idlanguage">
                                <div>{{option.title}}</div>
                            </div>
                            <template v-if="!slotProps.value || slotProps.value.length === 0">
                                Select languages
                            </template>
                        </template>
                        <template #option="slotProps">
                            <div class="language-item">
                                <div>{{slotProps.option.title}}</div>
                            </div>
                        </template>
                    </MultiSelect>
                  </div>
                  <div class="col-3">
                    <GeneralButton class="align-middle" text="Save" @click="saveLanguages()"/>
                  </div>
                </div>
              </div>
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
import GeneralButton from '@/components/GeneralButton.vue'
import LanguageService from "../services/language.service"

export default {
  name: 'Profile',
  components: {
    Menu,
    GeneralButton,
    MultiSelect
  },
  data(){
    return {
      allLanguages: null,
      languageFilter: null,
      languagesKnown: null
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
      this.languagesKnown = this.$store.getters['language/getAllLanguagesKnownByUser']
      this.languageFilter = this.$store.getters['language/getAllLanguagesKnownByUser']
      this.allLanguages = this.$store.getters['language/getAllLanguagesAvailable']
    }
  },
  methods:{
    saveLanguages(){
      let originalLangugesIDs = this.languagesKnown.map(language => language.idlanguage).sort()
      let modifiedLangugesIDs = this.languageFilter.map(language => language.idlanguage).sort()
      if( Array.isArray(originalLangugesIDs) &&
          Array.isArray(modifiedLangugesIDs) &&
          originalLangugesIDs.length === modifiedLangugesIDs.length &&
          originalLangugesIDs.every((val, index) => val === modifiedLangugesIDs[index])){
      } else {
        this.$store.dispatch('language/updateLanguagesKnowByUser', modifiedLangugesIDs).then(
          () => {
            this.languagesKnown = this.$store.getters['language/getAllLanguagesKnownByUser']
            this.languageFilter = this.$store.getters['language/getAllLanguagesKnownByUser']
          },
          (error) => {
            console.log(error)
          }
        )
      }
    }
  }
};
</script>
<style scoped>
h4, h5 {
  text-align: left;
}
ul {list-style-type: none;}
i {
  font-size: 500%;
  margin: 5%;
}
.p-multiselect {
    width: 95%;
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