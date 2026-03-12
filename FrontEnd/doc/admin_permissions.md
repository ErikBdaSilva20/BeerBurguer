# Alterações de Permissões de Administrador

**Autor**: Assistente de IA
**Data**: 11 de Março de 2026
**Objetivo**: Restringir a exibição de botões interativos das telas de Administrador (como "Salvar", "Excluir", edição e alteração de _status_) APENAS para o email do dono do repositório (`erikborgesdasilva574@gmail.com`). 
Essa alteração foi feita porque as rotas do painel administrativo estão públicas no modelo _View-Only_ para portifólio. Assim, os visitantes podem ver como as telas funcionam, mas não conseguem interagir com o Banco de Dados.

### 📝 O que foi alterado no FrontEnd?

Fizemos a troca pontual da variável lógica que verificava se o usuário possuía a flag booleana genérica de admin (`userInfo?.admin`).
Substituímos ela por uma verificação forte que garante que o e-mail exato do responsável autorizou o acesso:
`const isSuperAdmin = userInfo?.email === 'erikborgesdasilva574@gmail.com';`

**Arquivos modificados:**
1. `src/components/SideNav/index.jsx`: Oculta do menu lateral o item "Novo Produto".
2. `src/pages/Admin/Products/index.jsx`: Esconde a aba "Editar" na tabela e os botões de lápis.
3. `src/pages/Admin/NewProduct/index.jsx`: Oculta o botão de "Salvar".
4. `src/pages/Admin/EditProduct/index.jsx`: Oculta os botões "Salvar alterações" e "Excluir produto".
5. `src/pages/Admin/Orders/index.jsx`: Inversão da lógica da _Mock Data_ (dados fictícios) para ativar-se aos visitantes comuns e chamar dados reais do Postgres apenas para o _SuperAdmin_.
6. `src/pages/Admin/Orders/TableRow.jsx`: Desativa a lista _dropdown_ (`<SelectStatus>`) que alterava o _status_ do pedido.

### 🔄 Como desfazer e voltar as permissões padrão normais (onde qualquer pessoa com conta admin possa ver e editar)?

Quando criar o repositório privado para o mercado pago real e precisar abrir o ecossistema novamente, baster ir nesses 6 arquivos listados acima.
Eles possuem agora a declaração (perto do inídio do componente React):
```javascript
const { userInfo } = useUser();
const isSuperAdmin = userInfo?.email === 'erikborgesdasilva574@gmail.com';
```

Você deve reverter as coisas voltando para o original, que era:
Toda expressão com `isSuperAdmin` passará a se chamar `userInfo?.admin`!

Exemplo de reversão:
De: `{isSuperAdmin && <SubmitButton type="submit">Salvar alterações</SubmitButton>}`
Para: `{userInfo?.admin && <SubmitButton type="submit">Salvar alterações</SubmitButton>}`
