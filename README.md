# Translators_web_platform

Progetto sviluppato per la mia tesi di laurea magistrale in Ingegneria e Scienze Unformatiche presso l'Università di Bologna.

Il progetto si suddivide in tre cartelle principali:
- backend: contiene il codice per eseguire un backed in node.js.
- frontend: contiene il codice per eseguire una SPA sviluppata con il framework Vue.js;
- docker: contiene le istruzioni per creare un'infrastruttura di supporto e replicabilità.

## Istruzioni momentanee per l'esecuzione:

### docker
```
cd docker
docker-compose up
```
### backend
```
cd backend
npm i
node index.js
```
### seeder
```
cd backend
npm run seed
```
### frontend
```
cd frontend
npm i
npm run serve
```
