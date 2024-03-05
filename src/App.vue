

<template>
  <div class="main-background">
    <Navbar :user="user" />
    <router-view @logout="logout" @logar="(info) => login(info)" :user="user" />
    <Footer />
  </div>
</template>



<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'


export default {
  components: {
    Navbar,
    Footer,
  },
  name: 'App',
  data() {
    return {
      user: null,
    }
  },
  methods: {
    logout() {
      this.user = null;
    },
    login(info) {
      this.user = info;
    }
  },
  mounted() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }
}

</script>

<style>
.main-background {
  background-color: #EAEBED;
}

.btn-primary {
  background-color: #6a88eb;
  border-color: #6a88eb;
}
</style>
