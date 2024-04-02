

<template>
  <div class="main-background">
    <Navbar/>
    <router-view/>
    <Footer/>
  </div>
</template>



<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useUserStore } from './stores/UserStore';
import 'bootstrap'

export default {
  components: {
    Navbar,
    Footer,
  },
  name: 'App',
  data() {
    return {
      user: useUserStore(),
    }
  },
  mounted() {
    if (localStorage.getItem('user')) {
      this.user.setUser(JSON.parse(localStorage.getItem('user')));
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
