<template>
    <div class="col-lg-10 col-md-12 m-auto main-card">
        <div class="card shadow-lg card-1">
            <div class="card-body inner-card">
                <div class="row justify-content-center">
                    <div class="col-lg-5 col-md-6 col-sm-12">
                        <div class="form-group"><label for="first-name">Titulo</label><input v-model="title" type="text"
                                class="form-control" id="first-name" placeholder="Nome do item"> </div>

                    </div>
                    <div class="col-lg-5 col-md-6 col-sm-12">
                        <div class="form-group"> <label for="last-name">Data</label> <input v-model="data" type="date"
                                class="form-control" id="last-name" placeholder=""> </div>
                        <div class="form-group"> <label for="inputEmail4">Categoria</label> <select class="form-control"
                                v-model="category">
                                <option v-for="(cat, index) in categories" :key="index" :value="index + 1">{{
                            cat }}</option>
                            </select></div>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-12 col-lg-10 col-12">
                        <div class="form-group files"><label class="my-auto">Imagem </label>
                            <input @change="getImg" id="file" type="file" class="form-control" />
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-12 col-lg-10 col-12">
                        <div class="form-group"> <label for="exampleFormControlTextarea2">Descrição</label>
                            <textarea v-model="description" class="form-control rounded-0"
                                id="exampleFormControlTextarea2" rows="5"></textarea>
                        </div>
                        <div class="row justify-content-end mb-5">
                            <div class="col-lg-4 col-auto "><button @click="criarItem" type="button"
                                    class="btn btn-primary btn-block"><small class="font-weight-bold">Adcionar
                                        Item</small></button> </div>
                        </div>
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
            description: ''
        }
    },
    methods: {
        async getCategories() {
            const req = await fetch('http://localhost:1337/api/categories');
            const res = await req.json();
            let cat = '';
            for (let i = 0; i < res.data.length; i++) {
                cat = res.data[i].attributes.nome
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
        criarItem() {
            const item = {
                "data": {
                    "title": this.title,
                    "date": this.data,
                    "category": this.category,
                    "img": this.img,
                    "text": this.description,
                    "tipo": this.category,
                    "resgatado": null,
                    "solicitado": null,
                }

            }
            console.log(item);
            const req = fetch('http://localhost:1337/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.us.user.jwt,
                },
                body: JSON.stringify(item),
            }).then(async (response) => {
                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data);
                    this.$router.push('/');
                }
            });

        }
    },
    mounted() {
        console.log(this.us.user.role);
        if (this.us.user.role !== 'Admin') {
            console.log('Você não é Admin');
            this.$router.push('/');
        }
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