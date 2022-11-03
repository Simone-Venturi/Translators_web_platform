<template>
  <div id="app" class="container-fluid min-vh-100 d-flex flex-column">
    <div class="row">
      <div class="col">
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
          <a href="/" class="navbar-brand">Translator Platform</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="navbar-collapse collapse" id="navbarNav" >
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              <li v-if="showTranslatorBoard" class="nav-item">
                <router-link to="/translate" class="nav-link">Translator Board</router-link>
              </li>
              <li v-if="showDataScientistBoard" class="nav-item">
                <router-link to="/data" class="nav-link">Data Scientist Board</router-link>
              </li>
              <li v-if="showAdminBoard" class="nav-item">
                <router-link to="/dataset" class="nav-link">Admin Board</router-link>
              </li>
            </ul>            
            <div v-if="!currentUser" class="navbar-nav ml-auto">
              <ul class="navbar-nav">
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
              </ul>
            </div>
            <div v-if="currentUser" class="navbar-nav ml-auto">
              <ul class="navbar-nav">
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
              </ul>
            </div>
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
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles']['role_admin'];
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
.navbar-nav {
  text-align: left;
}
</style>