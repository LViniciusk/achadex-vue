<template>
    <nav>
        <router-link to="/" id="logo-url"><img src="/img/logo.png" alt="Logo" id="logo"></router-link>
        <router-link v-if="user" to="/user" class="username">{{ user.username }}</router-link>
        <router-link v-else to="/login" class="login-text">Login</router-link>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    props: {
        user: Object,
    },
    data() {
        return {

        }
    },
}
</script>

<style scoped>
nav {
    background: #6a88eb;
    border-bottom: 4px solid #6483ea;
    padding: 15px 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

#logo-url {
    margin: auto;
    margin-left: 0;
}

#logo {
    width: 50px;
    height: 50px;
}

.username, .login-text {
    margin: auto;
    margin-right: 0;
    color: #fff;
}
</style>