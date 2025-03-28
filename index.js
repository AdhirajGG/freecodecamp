const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Fix port to 3000
const cors = require('cors');

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Static files
app.use(express.static('public'));

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'hello API' });
});

// Timestamp endpoint
app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;
  let date;

  if (!dateParam) {
    date = new Date(); // Current time if no parameter
  } else {
    dateParam = decodeURIComponent(dateParam);
    
    // Check for Unix timestamp (numeric string)
    if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam); // Try parsing as date string
    }
  }

  // Validate date
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Successful response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});