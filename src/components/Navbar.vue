<template>
    <nav>
        <router-link to="/" id="logo-url"><img src="/img/logo.png" alt="Logo" id="logo"></router-link>
        <router-link v-if="user" to="/user" class="username "><div class="user-div"><img :src="user.img" class="user-img"><p>{{ user.username }}</p></div></router-link>
        <router-link v-else to="/login" class="login-text"><div class="user-div"><i class="bi bi-person-circle "></i><p>Login</p></div></router-link>
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

.user-img{
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

.username, .login-text {
    margin: auto;
    margin-right: 0;
    color: #fff;
}

.bi-person-circle{
    font-size: 40px;
    margin: auto;
    margin-right: 5px;  
}
.user-div{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}
.user-div p{
    margin: 0;
}
</style>