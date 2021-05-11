# **Clínicas API**

API para registro de atendimento e integrações do _Cockpit Clínicas_.

> ## APIs previstas:

<!-- 1. 🚧 Paciente
   - [Adicionar](./requirements/addPatient.md)
   - [Pesquisar](./requirements/findPatient.md) -->

1. 🚧 Atendimento
   - [Criar](./requirements/createMedicalCare.md)
   - [Verificar Atendimentos Abertos](./requirements/checkHasOpenEncounters.md)
   - [Receber dados de atendimento](./requirements/findStartEncounterData.md.md)

<!-- 3. 🚧 Terminologia
   - [Pesquisar](./requirements/findTerminology.md) -->

> ## Iniciando o projeto:

1. Instale as dependências

```shell
yarn
```

2. Inicie servidor

```shell
yarn start
```

> ## Rodando testes

Integração
```shell
yarn test:integration
```

Unidade
```shell
yarn test:unit
```

Cobertura
```shell
yarn test:coverage
```
Verboso
```shell
yarn test:verbose
```

> ## Criar banco de dados local
```shell
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD={password} -e MYSQL_DATABASE=cockpit_clinicas_test -d -t {banco-de-dados}
```
Opções de banco: mariadb ou mysql:5.7.22

> ## Scripts de banco de dados (**prisma**)

Migração
```shell
yarn migrate
```

Migração banco de testes
```shell
yarn migrate:test
```

Seeder banco
```shell
yarn seed
```

Seeder banco de testes
```shell
yarn seed:test
```

Abrir servidor prisma studio
```shell
yarn prismaStudio
```

Abrir servidor prisma studio de teste
```shell
yarn prismaStudio:test
```
