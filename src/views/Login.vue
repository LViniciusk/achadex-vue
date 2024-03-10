<template>
    <div class="login-div">
        <Message :msg="msg" v-show="msg" />
        <h1 class="text-center">Login</h1>
        <form>
            <!-- Email input -->
            <div class="form-outline mb-4">
                <input v-model="email" type="email" id="email" class="form-control" />
                <label class="form-label" for="email">Email address</label>
            </div>

            <!-- Password input -->
            <div class="form-outline mb-4">
                <input v-model="senha" type="password" id="pass" class="form-control" />
                <label class="form-label" for="pass">Password</label>
            </div>

            <!-- 2 column grid layout for inline styling -->
            <div class="row mb-4">
                <div class="col d-flex justify-content-center">
                    <!-- Checkbox -->
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="remember" checked />
                        <label class="form-check-label" for="remember"> Remember me </label>
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
import { useUserStore } from '@/stores/UserStore';
import Message from '../components/Message.vue'

export default {
    name: 'Login',
    components: {
        Message,
    },
    data() {
        return {
            msg: '',
            us: useUserStore(),
        }
    },
    methods: {
        async logar() {
            const req = await fetch('http://localhost:1337/api/auth/local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "identifier": this.email,
                    "password": this.senha,
                    
                    
                }),
            }).then(async (response) => {
                if (response.status === 200) {

                    const data = await response.json()
                    console.log(data)
                    const req = await fetch('http://localhost:1337/api/users/me?populate=role', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + data.jwt,
                        },
                    })
                    const udata = await req.json()
                    console.log(udata)



                    const info = {
                        email: data.user.email,
                        username: data.user.username,
                        id: data.user.id,
                        jwt: data.jwt,
                        img: data.user.img,
                        role: udata.role.name,
                    }
                    
                    this.us.setUser(info)
                    this.$router.push('/');

                    if(document.getElementById("remember").checked) localStorage.setItem('user', JSON.stringify(info));
                    
                    
                } else if(response.status === 400) {
                    this.email = ''
                    this.senha = ''
                    this.msg = 'Usuario ou senha invalidos'
                    setTimeout(() => {
                        this.msg = ''
                    }, 5000);

                }else{
                    console.log('Erro desconhecido')
                }
            });
            

        }
    }, mounted() {
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