const { Router } = require('express');
const routes = Router();

const QuestionsController = require('./controllers/QuestionsController');

routes.get('/questions', QuestionsController.getAllQuestions);
routes.get('/questions/:id', QuestionsController.getQuestionById);
routes.post('/questions', QuestionsController.createQuestion);

module.exports = routes;

/*
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index );
routes.post("/ongs", OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);
*/