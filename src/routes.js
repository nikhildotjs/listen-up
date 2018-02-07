import Express from 'express';
import path from 'path';
import UserServiceController from './controllers/user-service-controller';

export default {
  configure(app) {
    // Routing for Web API
    app.get('/users/:username', UserServiceController);

    // Routing for static assets
    app.use(Express.static(path.resolve(__dirname, '../public')));

    // Routing for the view
    app.get('/listen-up', (req, res) => {
      res.sendFile(path.resolve(__dirname, './index.html'));
    });

    // Routing for root
    app.get('/', (req, res) => {
      res.redirect('/listen-up');
    });
  }
};
