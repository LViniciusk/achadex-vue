<template>
    <div>
        <h1>Usuario</h1>
        <button @click="logout">Logout</button>
    </div>
</template>

<script>
    export default {
        name: 'User',
        props: {
            user: Object,
        },
        methods: {
            logout() {
                this.$emit('logout');
                localStorage.removeItem('user');
                this.$router.push('/');
            }
        },
        mounted() {
            if (!this.user) {
                this.$router.push('/login');
            }
        },
    }
</script>