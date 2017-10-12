const express = require('express');
const app = express();

app.set('trust proxy', true);

app.get('/', function(req, res) {
  const softwareRegExp = /\((.*)\)/;

  const software = softwareRegExp.exec(req.headers['user-agent'])[1];
  const language = req.headers['accept-language'].split(',')[0];

  res.json({
    ip: req.ip,
    language,
    software,
  });
});

module.exports = app;
