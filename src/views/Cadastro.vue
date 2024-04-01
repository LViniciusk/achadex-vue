<template>
    <div class="cadastro-div">
        <Message :msg="msg" v-show="msg" />
        <h1 class="text-center">Cadastro</h1>
        <form>

            <div class="card-img-top profile-img-modal">
                <label for="pic-input">
                    <input type="file" accept="image/*" class="pic-input" id="pic-input" @change="mudarImg">
                    <img :src="img" alt="Foto de perfil">
                </label>
            </div>

            <!-- Username input -->
            <div class="form-outline mb-4">
                <input v-model="usuario" type="text" id="username" class="form-control" />
                <label class="form-label" for="email">Username</label>
            </div>

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


            <!-- Submit button -->
            <button @click="cadastrar" type="button" class="btn btn-primary btn-block mb-4">Cadastrar</button>


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
            img: '/img/user-ico.png',
            usuario: '',
            email: '',
            senha: '',
        }
    },
    methods: {
        async cadastrar(){

            const data = {
                "username": this.usuario,
                "email": this.email,
                "password": this.senha,
                "img": this.img,
            }

            const req = await fetch('http://localhost:1337/api/auth/local/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(async (response) => {
                if (response.status === 200) {
                    this.msg = 'Usuario cadastrado com sucesso'
                    setTimeout(() => {
                        this.msg = ''
                    }, 5000);
                    this.logar()
                } else if(response.status === 400) {
                    this.msg = 'Error'
                    setTimeout(() => {
                        this.msg = ''
                    }, 5000);
                }else{
                    console.log('Erro desconhecido')
                }
            });




        },
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

                    localStorage.setItem('user', JSON.stringify(info));
                    
                    
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
            

        },
        mudarImg(e) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                this.img = e.target.result;
            }
            reader.readAsDataURL(file);
        },
    }, mounted() {
        if (this.us.user) {
            this.$router.push('/');
        }
    },

}
</script>


<style scoped>


.profile-img-modal {
    display: block;
    margin: auto;
    margin-bottom: 10px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 3px solid black;
    transition: .5s;
    cursor: pointer;
}

.profile-img-modal:hover {
    cursor: pointer;
    scale: 1.05;
}

.profile-img-modal::after {
    content: 'Editar';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 20px;
    font-weight: bold;
    opacity: 0;
    transition: .2s;

}

.profile-img-modal:hover::after {
    opacity: 1;
}

.profile-img-modal img {
    width: 145px;
    height: 145px;
    border-radius: 50%;
    transition: .2s;
}

.profile-img-modal img:hover {
    filter: brightness(60%);
    cursor: pointer;
}

.pic-input {
    display: none;
}


.cadastro-div {
    max-width: 300px;
    margin: 30px auto;
    height: 76vh;
}

</style>