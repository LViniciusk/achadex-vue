<template>
    <div class="col-lg-10 col-md-12 m-auto main-card">
        <div class="card shadow-lg card-1">
            <div class="card-body inner-card">
                <div class="row justify-content-center">
                    <div class="col-lg-5 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label for="first-name">Titulo</label>
                            <input v-model="title" type="text" class="form-control" id="first-name" placeholder="Nome do item" required>
                            <small v-if="errors.title" class="text-danger">{{ errors.title }}</small>
                        </div>
                    </div>
                    <div class="col-lg-5 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label for="last-name">Data</label>
                            <input v-model="data" type="date" class="form-control" id="last-name" placeholder="" required>
                            <small v-if="errors.data" class="text-danger">{{ errors.data }}</small>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4">Categoria</label>
                            <select class="form-control" v-model="category">
                                <option v-for="(cat, index) in categories" :key="index" :value="cat">{{ cat.nome }}</option>
                            </select>
                            <small v-if="errors.category" class="text-danger">{{ errors.category }}</small>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-12 col-lg-10 col-12">
                        <div class="form-group files">
                            <label class="my-auto">Imagem </label>
                            <input @change="getImg" id="file" type="file" class="form-control" required/>
                            <img width="200px" v-if="this.img" :src="img" alt="Foto de perfil">
                            <small v-if="errors.img" class="text-danger">{{ errors.img }}</small>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-12 col-lg-10 col-12">
                        <div class="form-group">
                            <label for="exampleFormControlTextarea2">Descrição</label>
                            <textarea v-model="description" class="form-control rounded-0" id="exampleFormControlTextarea2" rows="5"></textarea>
                        </div>
                        <div class="row justify-content-end mb-5">
                            <div class="col-lg-4 col-auto ">
                                <button @click="criarItem" type="button" class="btn btn-primary btn-block">
                                    <small class="font-weight-bold">Adicionar Item</small>
                                </button>
                            </div>
                        </div>

                        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

                        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
export default {
    name: 'AddItem',
    data() {
        return {
            us: useUserStore(),
            categories: [],
            title: '',
            data: '',
            category: '',
            img: '',
            description: '',
            errors: {}, 
            successMessage: '',
            errorMessage: '' 
        }
    },
    methods: {
        async getCategories() {
            const req = await fetch('http://localhost:1337/api/categories');
            const res = await req.json();
            
            for (let i = 0; i < res.data.length; i++) {
                let cat = {
                    "id": res.data[i].id,
                    "nome": res.data[i].attributes.nome
                };
                this.categories.push(cat);
            }
            console.log(this.categories);
        },
        getImg(e) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                this.img = e.target.result;
            }
            reader.readAsDataURL(file);
        },
        validarFormulario() {
            this.errors = {};

            if (!this.title) {
                this.errors.title = 'O título é obrigatório.';
            }

            if (!this.data) {
                this.errors.data = 'A data é obrigatória.';
            }

            if (!this.category) {
                this.errors.category = 'A categoria é obrigatória.';
            }

            if (!this.img) {
                this.errors.img = 'A imagem é obrigatória.';
            }

            return Object.keys(this.errors).length === 0;
        },
        criarItem() {
            if (this.validarFormulario()) {
                const item = {
                    "data": {
                        "title": this.title,
                        "date": this.data,
                        "img": this.img,
                        "text": this.description,
                        "category": { "id": this.category.id },
                        "tipo": this.category.nome,
                        "resgatado": null,
                        "solicitado": null,
                    }
                };

                fetch('http://localhost:1337/api/items/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.us.user.jwt,
                    },
                    body: JSON.stringify(item),
                })
                .then(async (response) => {
                    if (response.status === 200) {
                        const data = await response.json();
                        console.log(data);
                        this.successMessage = 'Item cadastrado com sucesso!';
                        this.errorMessage = '';
                        this.$router.push('/');
                    }
                })
                .catch(() => {
                    this.errorMessage = 'Ocorreu um erro ao cadastrar o item.';
                    this.successMessage = '';
                });
            } else {
                this.errorMessage = 'Preencha todos os campos obrigatórios corretamente.';
                this.successMessage = '';
            }
        }
    },
    mounted() {
        this.getCategories();
    }
}
</script>

<style scoped>
#file {
    cursor: pointer;
}

.main-card {
    max-width: 1000px;
    padding-top: 50px !important;
    border-radius: 20px;
}

.card-0 {
    min-height: 110vh;
    background: linear-gradient(-20deg, rgb(255, 255, 255) 50%, #6a88eb 50%);
    color: white;
    border: 0px;
}

p {
    font-size: 15px;
    line-height: 25px !important;
    font-weight: 500;


}

.container {
    padding-top: 100px !important;
    border-radius: 20px;
}



.btn {
    letter-spacing: 1px;
}

select:active {
    box-shadow: none !important;
    outline-width: 0 !important;

}

select:after {
    box-shadow: none !important;
    outline-width: 0 !important;

}

input,
textarea {
    padding: 10px 12px 10px 12px;
    border: 1px solid lightgrey;
    border-radius: 0px !important;
    margin-bottom: 5px;
    margin-top: 2px;
    width: 100%;
    box-sizing: border-box;
    color: #2C3E50;
    font-size: 14px;
    letter-spacing: 1px;
    resize: none;

}

select:focus,
input:focus {
    box-shadow: none !important;
    border: 1px solid #2196F3 !important;
    outline-width: 0 !important;
    font-weight: 400
}

label {
    margin-bottom: 2px;
    font-weight: bolder;
    font-size: 14px;
}

input:focus,
textarea:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: 1px solid #304FFE;
    outline-width: 0
}

button:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    outline-width: 0
}

.form-control {
    height: calc(2em + .75rem + 3px);
}

.inner-card {
    margin: 79px 0px 70px 0px;
}

.card-0 {
    margin-top: 100px;
    margin-bottom: 100px;
}

.card-1 {
    border-radius: 17px;
    color: black;
    box-shadow: 2px 4px 15px 0px rgb(0, 0, 0, 0.5) !important;
}

#file {
    border: 2px dashed #92b0b3 !important;

}

.color input {
    background-color: #f1f1f1;
}

.files:before {
    position: absolute;
    bottom: 60px;
    left: 0;
    width: 100%;
    content: attr(data-before);
    color: #000;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
}


#file {
    display: inline-block;
    width: 100%;
    padding: 95px 0 0 100%;
    background: url('https://i.imgur.com/VXWKoBD.png') top center no-repeat #fff;
    background-size: 55px 55px;
}
</style>