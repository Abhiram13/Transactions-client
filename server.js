//Install express server
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

const API_URL = process.env.API_URL || "";

fs.writeFile(__dirname + '/dist/Transactions-client/browser/assets/api.js', `const API_URL = '${API_URL}';`, err => {});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/Transactions-client/browser'));

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname + '/dist/Transactions-client/browser/index.html'));
});

try {
   app.listen(process.env.PORT || 4200);
   console.log("Angular server started at PORT ", process.env.PORT);
} catch (e) {
   console.log("Angular server is not starting", e);
}