# Translators_web_platform

Progetto sviluppato per la mia tesi di laurea magistrale in Ingegneria e Scienze Unformatiche presso l'Università di Bologna.

Il progetto si suddivide in tre cartelle principali:
- backend: contiene il codice per eseguire un backed in node.js;
- frontend: contiene il codice per eseguire una SPA sviluppata con il framework Vue.js;
- docker: contiene le istruzioni per creare l'infrastruttura e gestisce la replicabilità.

## Istruzioni per l'esecuzione:

### Esecuzione del sistema
```
cd docker
docker compose up --build
```
Così saran creati 7 container:
- backend su porta 3000;
- frontend su porta 80;
- database relazionale Postgres;
- database documentale MongoDB;
- istanza di Redis;
- istanza pgAdmin4 su porta 5555;
- istanza Redis Commander su porta 8081;

### Esecuzione dei seeder per la popolazione del database
```
docker exec -ti express_app_container bash
npm run seed-postgres
npm run seed-mongo
```
