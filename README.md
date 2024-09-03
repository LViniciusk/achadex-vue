# Achadex

Um site de achados e perdidos de um ambiente privado

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

- Usuário não registrador poderá ver os itens encontrados e seu estado
- Usuário registrador pode ver os itens e solicitar o resgate caso esteja disponivel alem de editar as informações do usuario
- O adminstrador do site pode: Adicionar, Excluir, Solicitar, Resgatar, cancelar o resgate e a solicitação de algum item, alem de editar suas informações

## Tecnologias e frameworks utilizados

**Frontend:**

- VueJS v3.0, Vue-Router e Pinia.

**Backend:**

- Strapi


## Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| User | X | X | X | X |
| Item | X | X |  X | X |
| Category |  |  X  |  |  |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| POST | api/auth/local |
| POST | api/auth/local/register |
| GET | api/users/me |
| PUT | api/user/me |
| GET | /api/items |
| PUT | /api/items/{id} |
| GET | /api/categories |
| DELETE | /api/items/{id} |
| DELETE | api/user/me/ |




Site: https://achadex.wuaze.com/
