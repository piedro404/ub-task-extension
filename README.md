# Extensão de Tarefas - Unibalsas 
Esta extensão foi feita incorporando a API "[ub-task-api](https://github.com/piedro404/ub-task-api/tree/main)" no meu repostitorio. Esta extensão vem como ideia para Unibalsas de um possivel aplicação que inovaria a forma de que seus alunos acessem sua atividades, ajundo na vizualização e gerenciamento dos prazos das tarefas e TED's.

### Login
![2023-08-01_16h11_11](https://github.com/piedro404/ub-task-extension/assets/88720549/fb57388c-a675-471e-905e-26f20834391c)

### Tarefas
![WhatsApp Image 2023-05-28 at 22 42 02](https://github.com/piedro404/ub-task-extension/assets/88720549/dba2638d-2aef-414c-bed2-e160f443752e)

## Recursos
- Login: Valida login e salva os dados no navegador para evitar repetir o processo
- Tarefas: Verifica se o usuario logado possui tarefas a serem realizado, listando-as para o usuário

[UNIBALSAS](https://www.unibalsas.edu.br/)
[API](https://github.com/piedro404/ub-task-api/tree/main)

A aplicação funciona assim:
Ela realizar request's para a API que retorna os dados para a aplicação. Depois mostrada visualmente pela extensão.

## Documentação
Acesse a [documentação da API](https://api-ub.pedroplayborges.repl.co/docs) e acesse o repositorio da [API](https://github.com/piedro404/ub-task-api/tree/main) para obter informações detalhadas sobre os endpoints, parâmetros e testes de requisições.

### Como usar
1. Faça o Login com sua matricula e senha na extenção.
   
![image](https://github.com/piedro404/ub-task-extension/assets/88720549/63b2a7ed-5588-4d6d-9416-59aaa53b6360)

2. Veja as Atividade e recarrege para visualizar novas atividades.
   
![image](https://github.com/piedro404/ub-task-extension/assets/88720549/29a9cbbd-85ae-4603-a0f5-f80bf1e2e906)

## Instalação
### Pré-requisitos

Certifique-se de ter o Python 3 instalado. Você também pode criar um ambiente virtual para isolar as dependências do projeto.

1. Clone este repositório ou faça download aqui:
   
   ```bash
   git clone https://github.com/piedro404/ub-task-api.git
   ```
2. Instale no navegador, no gerenciamento de extensão:
   
   ```bash
   pip install -r requirements.txt
   ```

### Executando a API

1. Execute o seguinte comando para iniciar a API:

   ```bash
   python main.py
   ```
2. A API será executada localmente em http://localhost:8000.

## Licença
Este projeto está licenciado sob a Licença MIT. Por favor, inclua a seguinte referência no seu trabalho derivado:
<br>
- API de Tarefas - Unibalsas - desenvolvida por [Piedro404](https://github.com/piedro404) sob a Licença MIT.


Obrigado a todos, desejo otimos estudos, caso queira, entre em contato em pedro.henrique.martins404@gmail.com.
