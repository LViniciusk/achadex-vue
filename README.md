# Achadex

Uma loja online destinada a vendas de Mangás.

Para executar este projeto siga os passos descritos no arquivo [passo-a-passo](passo-a-passo.md)

## Membros da equipe

Linyker Vinicius Gomes Barbosa, 556280, Ciencia da computação

## Papéis ou tipos de usuário da aplicação

- Usuário não registrado
- Usuário registrado
- Administrador

## Entidades ou tabelas do sistema

- User
- Item
- Category

## Principais funcionalidades da aplicação

- Usuário não registrador poderão ver os mangá e os comentários feitos por usuários registrados.
- Usuário registrador pode listar os mangás e seus detalhes, assim como usuários não registrados. 
Adicionalmente, eles podem escrever comentários sobre os mangás.
- O adminstrador da loja pode: adicionar, remover e editar os mangás.

## Tecnologias e frameworks utilizados

**Frontend:**

- VueJS v3.0, Vue-Router e Pinia.
- Axios

**Backend:**

- Strapi


## Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| User |  |  | X |  |
| Item | X  | X |  X | X |
| Category |  |  X  |  |  |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| POST | /auth/local |
| GET | /users/me |
| GET | /api/items |
| PUT | /api/items/{id} |
| GET | /api/categories |
| PUT | /api/mangas/{id} |
| DELETE | /api/mangas/{id} |