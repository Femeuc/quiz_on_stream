const { Router } = require('express');
const routes = Router();

const QuestionsController = require('./controllers/QuestionsController');
const QuestionSubjectsController = require('./controllers/QuestionSubjectsController');

routes.get('/questions', QuestionsController.getAllQuestions);
routes.get('/questions/:id', QuestionsController.getQuestionById);
routes.post('/questions', QuestionsController.createQuestion);

routes.get('/question_subjects', QuestionSubjectsController.getSubjectsByChannel);

module.exports = routes;