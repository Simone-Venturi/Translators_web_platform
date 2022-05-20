# Translators_web_platform

Thesis project, MSc in Engineering and Computer Science at the University of Bologna.

The project is divided into three folders:
- backend: code to take data from the sensors and send to Rasperry;
- frontend: take data form serial port and save in Firestore database;
- docker: web application realized with Vue to show and analize data.


Progetto sviluppato per la mia tesi di laurea magistrale in Ingegneria e Scienze Unformatiche presso l'Università di Bologna.

Il progetto si suddivide in tre cartelle principali:
- backend: contiene il codice per eseguire un backed in node.js.
- frontend: contiene il codice per eseguire una SPA sviluppata con il framework Vue.js;
- docker: contiene le istruzioni per creare un'infrastruttura di supporto e replicabilità.

## Istruzioni momentanee per l'esecuzione:

### backend
```
cd backend
npm i
node index.js
```
### frontend
```
cd frontend
npm i
npm run serve
```
### docker
```
cd docker
docker-compose up
```
