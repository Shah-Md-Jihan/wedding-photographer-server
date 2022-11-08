const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('weeding photographer server running');
});

app.listen(port, () => {
    console.log(`weeding photographer server running on port ${port}`);
});