const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const { Client } = require("pg");
// const { Movie } = require("@mui/icons-material");
const db = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database!");
});


app.get('/', (req, res)=>{
  res.send("Hello World");
})



app.get('/moods/movie', async (req, res) => {
  try {
    const query = `
    SELECT DISTINCT m.mood_id, m.mood_name
    FROM moods m
    JOIN recommendation_moods rm ON m.mood_id = rm.mood_id
    JOIN recommendations r ON rm.rec_id = r.rec_id
    WHERE r.medium = 'Movie';
    
    `;

    const { rows } = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An internal error occurred' });
  }
});


app.get('/recommendations/movies', async (req, res) => {
  try {
    const withMoodsParam = req.query.with_moods;
    const baseQuery = `
      SELECT
        r.rec_id,
        r.user_id,
        r.recommender,
        r.title,
        r.medium,
        r.medium_url,
        STRING_AGG(DISTINCT rm.mood_id::TEXT, ', ') AS moods_id,
        STRING_AGG(DISTINCT m.mood_name::TEXT, ', ') AS moods
      FROM
        recommendations r
      JOIN
        recommendation_moods rm ON r.rec_id = rm.rec_id
      JOIN
        moods m ON rm.mood_id = m.mood_id
      WHERE
        r.medium = 'Movie'
    `;

    if (withMoodsParam) {
      const moodIDs = withMoodsParam.split(',').map(id => parseInt(id, 10));

      if (moodIDs.length > 0) {
        const placeholders = moodIDs.map((_, index) => `$${index + 1}`).join(', ');
        const query = `
          ${baseQuery}
          AND m.mood_id IN (${placeholders})
          GROUP BY r.rec_id, r.user_id, r.recommender, r.title, r.medium, r.medium_url;
        `;

        const { rows } = await db.query(query, moodIDs);
        res.json(rows);
      } else {
        const query = `
          ${baseQuery}
          GROUP BY r.rec_id, r.user_id, r.recommender, r.title, r.medium, r.medium_url;
        `;

        const { rows } = await db.query(query);
        res.json(rows);
      }
    } else {
      const query = `
        ${baseQuery}
        GROUP BY r.rec_id, r.user_id, r.recommender, r.title, r.medium, r.medium_url;
      `;

      const { rows } = await db.query(query);
      res.json(rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An internal error occurred' });
  }
});



const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
