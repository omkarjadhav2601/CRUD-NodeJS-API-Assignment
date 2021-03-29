const winston = require('winston')
var dateFormat = require("dateformat");
dateFormat = () => {
  return new Date(Date.now()).toLocaleString().toUpperCase()
}

class LoggerService {
  constructor(route) {
    this.log_data = null
    this.route = route
    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `./logs/${route}.log`
        })
      ],
      format: winston.format.printf((info) => {
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} `
        message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message
        message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
        return message
      })
   });
   this.logger = logger
}
setLogData(log_data) {
  this.log_data = log_data
}
async info(message) {
  this.logger.log('info', message);
}

async debug(message) {
  this.logger.log('debug', message);
}

async error(message) {
  this.logger.log('error', message);
}

}
module.exports = LoggerService