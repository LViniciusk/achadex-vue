<template>
    <div>
     <Modal/>
        <div class="user-container" v-if="us.user">
            <div class="profile-text">
                <h1>Perfil de Usuario</h1>
            </div>
            <div class="profile-content">
                <div class="profile-card">
                    <div class="card profile" v-if="us.user">
                        <img v-if="us.user" class="card-img-top profile-img" :src="us.user.img" alt="Foto de perfil">
                        <div class="card-body">
                            <h5 v-if="us.user" class="card-title">{{ us.user.username }}</h5>
                            <p v-if="us.user.role === 'Admin'" class="card-text">{{ us.user.role }}</p>

                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary" @click="abrirModal">Editar Perfil</button>
                            <button @click="logout">Logout</button>
                        </div>
                    </div>
                </div>
                <div class="profile-info">
                    <div class="button-group">
                        <button class="btn profile-btn" @click="trocar(0)">Solicitados</button>
                        <button class="btn profile-btn" @click="trocar(1)">Resgatados</button>
                    </div>


                    <div class="container">
                        <div class="card extended" v-for="(card, index) in cards" :key="card.id" v-show="card.show">
                            <img class="card-extended-img" :src="card.img" :alt="card.alt">
                            <div class="card-body">
                                <div class="card-title udl">
                                    <p>{{ card.title }}</p>
                                </div>
                                <div class="card-body-admin">
                                    <div class="card-text">
                                        <p>{{ card.text }}</p>
                                        <p>Data de encontro: {{ card.date }}</p>
                                    </div>
                                    <div class="admin-options" v-if="(this.us.user.role === 'Admin')">
                                        <p v-if="(!card.resgatado)">Solicitado por: <strong>{{ card.solicitado
                                                }}</strong></p>
                                        <p v-else>Resgatado por: <strong>{{ card.resgatado }}</strong></p>
                                        <div class="admin-btn-op">
                                            <button v-show="!card.resgatado" class="btn btn-primary"
                                                @click="resgatar(index, card.id)">Resgatar</button>
                                            <button v-show="!card.resgatado" class="btn btn-danger"
                                                @click="excluirSolicitacao(index, card.id)">Excluir solicitação</button>
                                            <button v-show="card.resgatado" class="btn btn-danger"
                                                @click="excluirResgate(index, card.id)">Cancelar resgate</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
import Modal from '@/components/Modal.vue';
import $ from 'jquery';
export default {
    name: 'User',
    components: {
        Modal,
    },
    data() {
        return {
            cards: [],
            type: ['Solicitados', 'Resgatados'],
            typetext: '',
            us: useUserStore(),
        }
    },
    methods: {
        logout() {
            this.us.setUser(null);
            localStorage.removeItem('user');
            this.$router.push('/');
        },
        async getItems() {
            const req = fetch('http://localhost:1337/api/items', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data.data);
                    this.cards = [];
                    for (let i = 0; i < data.data.length; i++) {

                        const card = {
                            id: data.data[i].id,
                            img: data.data[i].attributes.img,
                            title: data.data[i].attributes.title,
                            text: data.data[i].attributes.text,
                            solicitado: data.data[i].attributes.solicitado,
                            resgatado: data.data[i].attributes.resgatado,
                            date: new Date(data.data[i].attributes.date).toLocaleDateString(),
                            original_date: data.data[i].attributes.date,
                            tipo: data.data[i].attributes.tipo,
                            alt: 'Item Encontrado',
                            show: ((data.data[i].attributes.solicitado === this.us.user.username && !data.data[i].attributes.resgatado) || (this.us.user.role === 'Admin' && data.data[i].attributes.solicitado && !data.data[i].attributes.resgatado)),
                        };
                        this.cards.push(card);

                    }
                }
            });
        },
        async trocar(index) {
            this.typetext = this.type[index];
            const buttons = document.querySelectorAll('.profile-btn');
            buttons.forEach((button) => {
                button.classList.remove('clicked');
            });
            buttons[index].classList.add('clicked');

            if (this.us.user.role === 'Admin') {
                if (this.typetext === 'Solicitados') {
                    for (let i = 0; i < this.cards.length; i++) {
                        this.cards[i].show = (this.cards[i].solicitado && !this.cards[i].resgatado);
                    }
                } else if (this.typetext === 'Resgatados') {

                    for (let i = 0; i < this.cards.length; i++) {
                        this.cards[i].show = (this.cards[i].resgatado);
                    }
                }
                return;
            }
            if (this.typetext === 'Solicitados') {
                for (let i = 0; i < this.cards.length; i++) {
                    this.cards[i].show = (this.cards[i].solicitado === this.us.user.username && !this.cards[i].resgatado);
                }
            } else if (this.typetext === 'Resgatados') {
                for (let i = 0; i < this.cards.length; i++) {
                    this.cards[i].show = (this.cards[i].resgatado === this.us.user.username);
                }
            }



        },
        resgatar(index, id) {
            const info = {
                "data": {
                    "title": this.cards[index].title,
                    "img": this.cards[index].img,
                    "text": this.cards[index].text,
                    "date": this.cards[index].original_date,
                    "solicitado": this.cards[index].solicitado,
                    "tipo": this.cards[index].tipo,
                    "resgatado": this.cards[index].solicitado,
                }
            }


            const req = fetch(`http://localhost:1337/api/items/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.us.user.jwt,
                },
                body: JSON.stringify(info),
            }).then(async (response) => {
                const data = await response.json();
                console.log(data);
                this.cards = [];
                this.getItems();

            });
        },

        excluirSolicitacao(index, id) {
            const info = {
                "data": {
                    "title": this.cards[index].title,
                    "img": this.cards[index].img,
                    "text": this.cards[index].text,
                    "date": this.cards[index].original_date,
                    "solicitado": null,
                    "tipo": this.cards[index].tipo,
                    "resgatado": null,
                }
            }


            const req = fetch(`http://localhost:1337/api/items/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.us.user.jwt,
                },
                body: JSON.stringify(info),
            }).then(async (response) => {
                const data = await response.json();
                console.log(data);
                this.cards = [];
                this.getItems();

            });
        },
        excluirResgate(index, id) {
            const info = {
                "data": {
                    "title": this.cards[index].title,
                    "img": this.cards[index].img,
                    "text": this.cards[index].text,
                    "date": this.cards[index].original_date,
                    "solicitado": this.cards[index].solicitado,
                    "tipo": this.cards[index].tipo,
                    "resgatado": null,
                }
            }


            const req = fetch(`http://localhost:1337/api/items/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.us.user.jwt,
                },
                body: JSON.stringify(info),
            }).then(async (response) => {
                const data = await response.json();
                console.log(data);
                this.cards = [];
                this.getItems();
                setTimeout(() => {
                    this.trocar(1);
                }, 50);

            });
        },
        abrirModal() {
            $('#modal').modal('show')
        },
            

    },
    mounted() {
        this.getItems()
        this.trocar(0);

    },
}
</script>

<style scoped>
.user-container {
    margin: 25px;
    min-height: 75vh;
}

.profile-text {
    margin: 15px 0;
    padding: 15px;
    border-radius: 0.25rem;
    background-color: #ffffff;
    box-shadow: 0 2px 7px rgba(0, 0, 0, .2);
}

h1 {
    font-size: 2rem;
}

.udl {
    border-bottom: 3px solid #6a88eb50;
}

.udl p {
    margin: 0px;
    margin-bottom: 5px;
}

.profile {
    padding: 10px;
    width: 300px;
    height: 300px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
}

.container {
    margin-top: 2px;
    padding: 10px;
    border-radius: 0.25rem;
}

.extended {
    margin-bottom: 5px;
    height: 200px;
    display: flex;
    flex-direction: row;
}

.card-extended-img {
    display: block;
    width: 180px;
    height: 100%;
    padding: 20px;
}

.profile-img {
    display: block;
    margin: 20px auto 0px auto;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid black;
}

.card-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-text {
    max-width: 100%;
    margin-bottom: 20px;
}

.card-title {
    text-align: center;
    font-size: 20px;
}

.card-body {
    padding: 5px;
}

.profile-content {
    display: flex;

}

.profile-info {
    background: #ffffff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
    width: 100%;
    margin-left: 20px;
    padding: 10px;
    border-radius: 0.25rem;
}


.profile-btn:focus,
.clicked {
    background-color: #6a88eb;
    box-shadow: none;
    color: white;
}

.button-group button {
    margin-right: 4px;
}

.admin-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    width: 400px;
    padding: 5px;
    border-radius: 0.25rem;
    margin-top: 10px;
    border: 1px solid black;
}

.admin-options p {
    margin: 0px;
}

.admin-btn-op {
    display: flex;
    flex-direction: column;
}

.admin-btn-op button {
    margin: 5px;

}

.card-body-admin {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
}
</style>