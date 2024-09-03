<template>

    <!-- Modal -->
    <div ref="modal" class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">Editar Perfil</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                        @click="cancelarAlteracao">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="card-img-top profile-img-modal">
                        <label for="pic-input">
                            <input type="file" accept="image/*" class="pic-input" id="pic-input" @change="mudarImg">
                            <img :src="img" alt="Foto de perfil">
                        </label>
                    </div>
                    <div class="input-div">
                        <label for="">Username: </label><br>
                        <label for="">Email: </label>
                    </div>
                    <div class="input-div">
                        <input type="text" v-model="username"><br>
                        <input type="email" v-model="email">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deletarPerfil">Excluir
                        Conta</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="editarPerfil">Salvar
                        Alterações</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
import $ from 'jquery';
export default {
    name: 'Modal',
    data() {
        return {
            us: useUserStore(),
            username: '',
            email: '',
            img: '',
        }
    },
    methods: {
        reset() {
            this.username = this.us.user.username;
            this.email = this.us.user.email;
            this.img = this.us.user.img;
        },
        mudarImg(e) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                this.img = e.target.result;
            }
            reader.readAsDataURL(file);
        },
        deletarPerfil() {
            const req = fetch(`http://localhost:1337/api/user/me`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.us.user.jwt,
                },
            }).then(async (response) => {
                if (response.status === 200) {
                    this.reset();
                    this.us.setUser(null);
                    localStorage.removeItem('user');
                    this.$router.push('/');
                }
            });

        },
        editarPerfil() {
            if (this.username == this.us.user.username && this.email == this.us.user.email && this.img == this.us.user.img) {
                this.reset();
                return;
            }

            const data = {
                img: this.img,
                username: this.username,
                email: this.email,

            }
            const req = fetch(`http://localhost:1337/api/user/me`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.us.user.jwt,
                },
                body: JSON.stringify(data),
            }).then(async (response) => {
                if (response.status === 200) {
                    const reqs = await fetch('http://localhost:1337/api/users/me?populate=role', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + this.us.user.jwt,
                        },
                    })
                    const udata = await reqs.json()
                    console.log(udata)
                    const info = {
                        email: udata.email,
                        username: udata.username,
                        id: udata.id,
                        jwt: this.us.user.jwt,
                        img: udata.img,
                        role: udata.role.name,
                    }
                    this.us.setUser(info);
                    localStorage.setItem('user', JSON.stringify(info));
                    this.reset();
                }
            });

        },


    },
    mounted() {
        if (this.us.user) {
            this.reset()
            $(this.$refs.modal).on('hidden.bs.modal', this.reset);
        }
    },

    beforeDestroy() {
        $(this.$refs.modal).off('hidden.bs.modal', this.reset);
    }

}
</script>

<style scoped>
.input-div {
    display: inline-block;
    margin-right: 10px;
}

.input-div input {
    margin-bottom: 10px;

}

.input-div label {
    margin-top: 10px;
}

.pic-input {
    display: none;
}

.profile-img-modal {
    display: block;
    margin: auto;
    margin-bottom: 10px;
    width: 200px;
    height: 200px;
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
    width: 195px;
    height: 195px;
    border-radius: 50%;
    transition: .2s;
}

.profile-img-modal img:hover {
    filter: brightness(60%);
    cursor: pointer;
}
</style>