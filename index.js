const app = require('./app');
const database = require('./db');
const config = require('./config');

database().then(info => {
    console.log(`Connected to ${info.host}: ${info.port}/${info.name}`);
    app.listen(config.PORT, function () {
        console.log(`Example app listening on port ${config.PORT}`)
    });
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

