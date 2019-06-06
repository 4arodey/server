const usersService = require('./services/users/users.service');
const app = express();


app.get('/all', (req, res) => {
  usersService.findAll().then((todos) => {
    console.log(todos);
  });
});


