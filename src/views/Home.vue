<template>
  <div>
    <div class="home-nav">
      <h1 class="text-center">Itens encontrados</h1>
      <div class="retangulo">
        <div class="data-filter">
          <div>
            <button class="btn btn-small btn-primary data-filter-item" :class="{ clicked: selectedFilter === 'todos' }"
              @click="selectedFilter = 'todos'">
              Todos
            </button>
          </div>
          <div>
            <button v-for="filter in filters" :key="filter.id" @click="selectedFilter = filter.name"
              class="btn btn-small btn-primary data-filter-item" :class="{ clicked: selectedFilter === filter.name }">
              {{ filter.name }}
            </button>
          </div>
        </div>

        <div class="card-columns">
          <div class="card" v-for="(card, index) in filteredCards" :key="card.id">
            <img class="card-img-top" :src="card.img" :alt="card.alt">
            <div class="card-body">
              <h5 class="card-title">{{ card.title }}</h5>
              <p class="card-text">{{ card.text }}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">{{ card.date }}</small>
              <p v-if="card.resgatado" class="m-0">Resgatado</p>
              <p v-if="!card.resgatado && card.solicitado" class="m-0">Solicitado</p>
              <p v-if="!us.user && !card.resgatado && !card.solicitado" class="m-0">Disponível</p>
              <button class="btn btn-danger" v-if="us.user && us.user.role === 'Admin' && !card.solicitado"
                @click="deleteItem(card.id)">
                <i class="bi bi-trash"></i>
              </button>
              <button v-if="!card.resgatado && !card.solicitado" v-show="us.user" @click="solicitarItem(index, card.id)"
                class="btn btn-primary">
                Solicitar
              </button>
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
  name: 'Home',
  data() {
    return {
      cards: [],
      filters: [],
      selectedFilter: 'todos',
      us: useUserStore(),
    };
  },
  computed: {
    filteredCards() {
      if (this.selectedFilter === 'todos') {
        return this.cards.filter(card => !card.resgatado);
      } else {
        return this.cards.filter(
          card => card.tipo.toLowerCase() === this.selectedFilter.toLowerCase() && !card.resgatado
        );
      }
    }
  },
  methods: {
    deleteItem(id) {
      fetch(`http://localhost:1337/api/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.us.user.jwt,
        },
      }).then(async (response) => {
        const data = await response.json();
        console.log(data);
        this.cards = [];
        this.getItems();
      });
    },

    solicitarItem(index, id) {
      const info = {
        data: {
          title: this.cards[index].title,
          img: this.cards[index].img,
          text: this.cards[index].text,
          date: this.cards[index].original_date,
          solicitado: this.us.user.username,
          tipo: this.cards[index].tipo,
          resgatado: null,
        },
      };

      fetch(`http://localhost:1337/api/items/${id}`, {
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

    async getItems() {
      const req = fetch('http://localhost:1337/api/items?populate=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          console.log(data.data);
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
              show: true,
              category: data.data[i].attributes.category,
            };
            this.cards.push(card);
          }
        }
      });

      this.filters = [];
      fetch('http://localhost:1337/api/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          console.log(data.data);
          for (let i = 0; i < data.data.length; i++) {
            const category = {
              id: data.data[i].id,
              name: data.data[i].attributes.nome,
            };
            this.filters.push(category);
          }
        }
      });
    },
  },
  mounted() {
    this.getItems();
  },
};
</script>


<style scoped>
.home-nav {
  margin: 20px auto;
}

.data-filter {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
  padding: 0 10px;
}

.data-filter-item {
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
  grid-template-columns: 23.65% 23.65% 23.65% 23.65%;


}

.retangulo {
  border: 1px solid rgba(0, 0, 0, 0.063);
  max-width: 1200px;
  margin: 25px auto;
  padding: 15px;
  border-radius: 15px;
  background-color: #ffffff58;
  box-shadow: 0 15px 20px rgba(0, 0, 0, .2);

}

.card {
  padding: 10px;
  height: 400px;
}

.card img {
  display: block;
  margin: auto;
  max-width: 100%;
  height: 200px;
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

.clicked {
  background-color: #0069d9;
  color: #fff;
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
