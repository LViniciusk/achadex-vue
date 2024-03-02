<template>
  <div>
    <div class="home-nav">
      <h1 class="text-center">Itens encontrados</h1>
      <div class="data-filter">
        <div><button class="btn btn-small btn-primary data-filter-item todos">Todos</button></div>
        <div>
          <button class="btn btn-small btn-primary data-filter-item">Chave</button>
          <button class="btn btn-small btn-primary data-filter-item">Fone</button>
          <button class="btn btn-small btn-primary data-filter-item">Carregador</button>
        </div>
      </div>





    </div>


    <div class="card-columns">
      <div class="card" v-for="(card, index) in cards" :key="index">
        <img class="card-img-top" :src="card.img" :alt="card.alt">
        <div class="card-body">
          <h5 class="card-title">{{ card.title }}</h5>
          <p class="card-text">{{ card.text }}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">{{ card.date }}</small>
          <button @click="solicitarItem(index)" v-show="user" class="btn btn-primary">Solicitar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    user: Object,
  },
  data() {
    return {
      cards: [
        {
          img: '/img/logo.png',
          title: 'Item 1',
          text: 'item um muito foda achado em algum canto',
          date: '20/12/2023',
          alt: 'Card image cap',
        },
        {
          img: '/img/logo.png',
          title: 'Item 2',
          text: 'item dois muito foda achado em algum canto',
          date: '26/04/2013',
          alt: 'Card image cap',
        },
        {
          img: '/img/logo.png',
          title: 'Item 3',
          text: 'item três muito foda achado em algum canto',
          date: '26/04/2013',
          alt: 'Card image cap',
        },
        {
          img: '/img/logo.png',
          title: 'Item 2',
          text: 'item quatro muito foda achado em algum canto',
          date: '26/04/2013',
          alt: 'Card image cap',
        },
      ]
    }
  },
  methods: {
    solicitarItem(index) {
      console.log('solicitar item', index);
    }
  }
}
</script>

<style scoped>
.home-nav {
  margin-top: 10px;
}

.data-filter {
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: auto;
}

.data-filter-item{
  min-width: 10%;
  margin: 3px;
  margin-bottom: 50px;
}

.card-columns {
  margin: 10px auto;
  padding: 0 10px;
  max-width: 1200px;
  min-height: 81vh;
  display: grid;
  grid-template-columns: 33% 33% 33%;
}

.card {
  padding: 10px;
  height: 500px;
}

.card img {
  display: block;
  margin: auto;
  max-width: 200px;
  max-height: 200px;
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

@media screen and (max-width: 860px) {
  .card-columns {
    grid-template-columns: 50% 50%;
  }

}

@media screen and (max-width: 470px) {
  .card-columns {
    grid-template-columns: 100%;
  }
}
</style>
