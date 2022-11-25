# Translators_web_platform

Progetto sviluppato per la mia tesi di laurea magistrale in Ingegneria e Scienze Unformatiche presso l'Università di Bologna.

## Contenuto del progetto:
Il progetto si pone come obiettivo la costruzione di una piattaforma web che accoglie frasi e traduzioni in diverse lingue. Un utente può registrarsi come traduttore ed entrare all'interno del sistema. Al suo accesso sarà possibile scegliere le proprie lingue di competenza, di conseguenza nelle varie sezioni della piattaforma gli saranno proposte solamente frasi da tradurre, traduzioni da valutare e testi da allineare che riguardano unicamente le sue lingue di interesse.
Tramite il contributo della comunity, la piattaforma costruirà circolarità di informazione costruendo catene di traduzione, valutate da esperti validando così la bontà della traduzione. 


Il progetto si suddivide in tre cartelle principali:
- backend: contiene il codice per eseguire un backed sviluppato in node.js;
- frontend: contiene il codice per eseguire una SPA sviluppata con il framework Vue.js;
- docker: contiene le istruzioni per creare l'infrastruttura e gestisce la replicabilità.
## Istruzioni per l'esecuzione:

### Esecuzione del sistema in produzione
```
cd docker
docker compose --file docker-compose.prod.yml up --build -d
```

Così saran creati 5 container:
- backend su porta 3000;
- frontend su porta 80;
- database relazionale Postgres;
- database documentale MongoDB;
- istanza di Redis;

### Esecuzione dei seeder per la popolazione del database
```
docker exec -ti express_app_container bash
npm run seed-postgres
npm run seed-mongo
```

### Esecuzione del sistema per testing
```
cd docker
docker compose --file docker-compose.dev.yml up --build -d
```
Così saran creati 7 container:
- backend su porta 3000;
- frontend su porta 80;
- database relazionale Postgres;
- database documentale MongoDB;
- istanza di Redis;
- istanza pgAdmin4 su porta 5555;
- istanza Redis Commander su porta 8081;

#### Esecuzione dei test
```
docker exec -ti express_app_container bash
npm test
```

## Swagger
Le API costruite sono consultabili anche attraverso Swagger.
Di default su porta 3000 al percorso /docs, ad esempio http://localhost:3000/docs/