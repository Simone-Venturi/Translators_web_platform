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
docker-compose up
```
Così saran creati 4 container:
- database Postgres su porta di default 5432;
- backend su porta 3000;
- frontend su porta 80;
- istanza pgAdmin4 su porta 5555.

### Esecuzione dei seeder per la popolazione del database
```
docker exec -ti <nome_container_backend> bash
node dist/seeders/index.js
```
