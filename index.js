const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 
const cors = require('cors');


app.use(cors({ optionsSuccessStatus: 200 }));


app.use(express.static('public'));


app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'hello API' });
});


app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;
  let date;

  if (!dateParam) {
    date = new Date(); 
  } else {
    dateParam = decodeURIComponent(dateParam);
    
   
    if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam); 
    }
  }

 
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

 
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
