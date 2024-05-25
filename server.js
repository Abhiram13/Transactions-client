//Install express server
const express = require('express');
const path = require('path');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/Transactions-client/browser'));

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname + '/dist/Transactions-client/browser/index.html'));
});

// Start the app by listening on the default Heroku port
try {
   app.listen(process.env.PORT || 8080);
   console.log("Angular server started at PORT ", process.env.PORT);
} catch (e) {
   console.log("Angular server is not starting", e);
}