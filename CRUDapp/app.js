var winston = require('./config/winston');
app.use(morgan('combined', { stream: winston.stream }));