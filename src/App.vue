<template>
  <Navbar :user="user" />
  <router-view @logar="(account) => this.user = account" :user="user" />
  <Footer />
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
  }
}

</script>

<style></style>
