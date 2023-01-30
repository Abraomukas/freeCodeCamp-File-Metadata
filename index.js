const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config();

app.use(fileUpload({ createParentPath: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

/*
 * POST
 * Returns the NAME, TYPE, and SIZE of the file uploaded by the user
 */
app.post('/api/fileanalyse', (req, res) => {
	try {
		if (!req.files) {
			res.json({ status: 412, message: 'No file was uploaded!' });
		} else {
			let fileName = req.files.name;
			let fileType = req.files.mimetype;
			let fileSize = req.files.size;

			res.json({ name: fileName, type: fileType, size: fileSize });
		}
	} catch (err) {
		res.json({ status: 500, message: err });
	}
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Your app is listening on port ' + port);
});
