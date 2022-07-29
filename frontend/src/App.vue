<template>
  <div id="app" class="container-fluid min-vh-100 d-flex flex-column">
    <div class="row">
      <div class="col">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" class="navbar-brand">Project</a>
          <div class="navbar-nav mr-auto">
            <li v-if="showTranslatorBoard" class="nav-item">
              <router-link to="/translate" class="nav-link">Translator Board</router-link>
            </li>
            <li v-if="showDataScientistBoard" class="nav-item">
              <router-link to="/data" class="nav-link">Data Scientist Board</router-link>
            </li>
          </div>
          <div v-if="!currentUser" class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/register" class="nav-link">
                <font-awesome-icon icon="user-plus" /> Sign Up
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">
                <font-awesome-icon icon="sign-in-alt" /> Login
              </router-link>
            </li>
          </div>
          <div v-if="currentUser" class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">
                <font-awesome-icon icon="user" />
                {{ currentUser.username }}
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="logOut">
                <font-awesome-icon icon="sign-out-alt" /> LogOut
              </a>
            </li>
          </div>
        </nav>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showTranslatorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles']['role_translator'];
      }
      return false;
    },
    showDataScientistBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles']['role_data_scientist'];
      }
      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
<style scoped>
.col, .row {
  margin: 0% !important;
  padding: 0% !important;
}
</style>