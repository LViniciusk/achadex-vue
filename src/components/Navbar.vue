<template>
    <nav>
        <router-link to="/" id="logo-url"><img src="/img/logo.png" alt="Logo" id="logo"></router-link>
        <div v-if="us.user" class="username ">
            <div class="user-div "><img :src="us.user.img" class="user-img ">
                <p class="dropdown-toggle dropdown" id="profile-dropdown" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">{{ us.user.username }}</p>
                <div class="dropdown-menu" aria-labelledby="profile-dropdown">
                    <router-link to="/user" class="dropdown-item">Meu Perfil</router-link>
                    <router-link to="/addItem" class="dropdown-item" v-if="us.user.role === 'Admin'" >Adcionar Item</router-link>
                    <p class="dropdown-item" @click="logout">Logout</p>
                </div>
            </div>
        </div>
        <router-link v-else to="/login" class="login-text">
            <div class="user-div"><i class="bi bi-person-circle "></i>
                <p>Login</p>
            </div>
        </router-link>
    </nav>
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
export default {
    name: 'Navbar',
    data() {
        return {
            us: useUserStore(),
        }
    },
    methods: {
        logout() {
            this.us.setUser(null);
            localStorage.removeItem('user');
            this.$router.push('/');
        },
    }

}
</script>

<style scoped>
.dropdown-toggle, .dropdown-item {
    cursor: pointer;
}

nav {
    background: #6a88eb;
    border-bottom: 4px solid #6a88eb;
    padding: 15px 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

#logo-url {
    margin: auto;
    margin-left: 0;
}

.user-img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: 3px solid white;
    margin-right: 5px;
}

#logo {
    width: 65px;
    height: 65px;
}

.username,
.login-text {
    margin: auto;
    margin-right: 0;
    color: #fff;
}

.bi-person-circle {
    font-size: 40px;
    margin: auto;
    margin-right: 5px;
}

.user-div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}

.user-div p {
    margin: 0;
}
</style>