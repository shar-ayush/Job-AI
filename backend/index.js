const express = require('express');
const app = express();
const PORT = 8000;


app.get('/', (req, res) => {
    res.send('Backend API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});