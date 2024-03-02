<template>
    <div class="login-div">
        <h1 class="text-center">Login</h1>
        <form>
            <!-- Email input -->
            <div class="form-outline mb-4">
                <input v-model="email" type="email" id="form2Example1" class="form-control" />
                <label class="form-label" for="form2Example1">Email address</label>
            </div>

            <!-- Password input -->
            <div class="form-outline mb-4">
                <input v-model="senha" type="password" id="form2Example2" class="form-control" />
                <label class="form-label" for="form2Example2">Password</label>
            </div>

            <!-- 2 column grid layout for inline styling -->
            <div class="row mb-4">
                <div class="col d-flex justify-content-center">
                    <!-- Checkbox -->
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                        <label class="form-check-label" for="form2Example31"> Remember me </label>
                    </div>
                </div>

                <div class="col">
                    <!-- Simple link -->
                    <a href="#!">Forgot password?</a>
                </div>
            </div>

            <!-- Submit button -->
            <button @click="logar" type="button" class="btn btn-primary btn-block mb-4">Sign in</button>


        </form>
    </div>
</template>
  
<script>
export default {
    name: 'Login',
    props: {
        user: Object,
    },
    methods: {
        logar() {
            if (this.email === 'jogas@gmail.com' && this.senha === '123') {
                this.$emit('logar', { username: 'jogas' });
                this.$router.push('/');
            }
        }
    },mounted() {
        if (this.user) {
            this.$router.push('/');
        }
    },

}
</script>
  

<style scoped>
.login-div {
    max-width: 300px;
    margin: 30px auto;
    height: 76vh;
}

.login-div form {
    margin: 50px auto;
}
</style>