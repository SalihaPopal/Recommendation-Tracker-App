const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const { Client } = require("pg");
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


// Define a route to fetch moods
app.get('/moods', async (req, res) => {
  try {
    const query = `
    SELECT
    m.mood_id,
    m.mood
FROM
    moods m
WHERE
    m.recommendation_id IN (
        SELECT recommendation_id FROM recommendations WHERE medium = 'Movie'
    );       
    `;

    // console.log('Executing query:', query);

    const { rows } = await db.query(query);

    console.log('Query result:', rows);

    const moviesWithMoods = rows.map((row) => ({
      mood_id: row.mood_id,
      mood: row.mood,
    }));

    res.json(moviesWithMoods);
  } catch (error) {
    console.error('Error fetching movies with moods:', error);
    res.status(500).json({ error: 'An error occurred while fetching movies with moods.' });
  }
});



// Define a route to retrieve filter for recommendations/moods
app.get('/recommendations/moods/movies/list', async (req, res) => {
  try {
    const query = `
    SELECT
    r.recommendation_id,
    r.title,
    r.recommender,
    r.medium_url
FROM
    recommendations r
JOIN
    moods m ON r.recommendation_id = m.recommendation_id
WHERE
    r.medium = 'Movie'
    AND m.mood IN ('Mystery', 'Action', 'Nasheed', 'Sad', 'Comedy', 'Party', 'Romantic', 'Thoughtful', 'Horror drama', 'Mystery', 'Prophecy', 'Horror', 'Comedy', 'Drama', 'Science fiction', 'thriller drama', 'Magical', 'Animated', 'Adventure', 'Comedy drama'); 
  `; 
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});


// Define a route to retrieve recommendations
app.get('/recommendations', async (req, res) => {
  try {
    const query = `
    SELECT 
      r.recommendation_id, 
      r.user_id, 
      r.recommender, 
      r.title, 
      r.medium, 
      m.mood
    FROM recommendations r
    LEFT JOIN moods m ON r.recommendation_id = m.recommendation_id;
  `;
    
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});


app.get('/recommendations/movies', async (req, res) => {
  // const medium = req.query.medium;
  try {
    const query = `
    SELECT
    r.recommendation_id,
    r.user_id,
    r.recommender,
    r.title,
    r.medium,
    r.medium_url,
    STRING_AGG(DISTINCT m.mood_id::TEXT, ', ') AS moods_id,
    STRING_AGG(DISTINCT m.mood::TEXT, ', ') AS moods
FROM
    recommendations r
JOIN
    moods m ON r.recommendation_id = m.recommendation_id
WHERE
    r.medium = 'Movie'
GROUP BY
    r.recommendation_id, r.user_id, r.recommender, r.title, r.medium, r.medium_url;

    `;
    // console.log('Executing query:', query);
    const data = await db.query(query);
    // console.log('Query result:', data);
    res.json(data.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route for query by mood
app.get('/recommendations/:mood', async (req, res) => {
  try {
    const mood = req.params.mood; // Get the mood from the URL parameter
    const query = `
      SELECT
        r.recommendation_id AS rec_id,
        r.title AS rec_title,
        r.medium,
        r.recommender,
        m.mood AS recommendation_mood
      FROM recommendations r
      JOIN moods m ON r.recommendation_id = m.recommendation_id
      WHERE r.medium IN ('Movie', 'Book', 'Music')  
      AND m.mood = $1::text;
    `;
    const { rows } = await db.query(query, [mood]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//   Route for searching by various criteria.   
//   http://localhost:8080/search-media?medium=Book
app.get('/search-media', async (req, res) => {
  try {
    const { medium, title, recommender, mood } = req.query;

    const query = `
      SELECT 
        r.title, 
        r.medium, 
        r.recommender, 
        m.mood
      FROM recommendations r
      LEFT JOIN moods m ON r.recommendation_id = m.recommendation_id
      WHERE
        ($1::text IS NULL OR r.medium ILIKE '%' || $1::text || '%')
        AND
        ($2::text IS NULL OR r.title ILIKE '%' || $2::text || '%')
        AND
        ($3::text IS NULL OR r.recommender ILIKE '%' || $3::text || '%')
        AND
        ($4::text IS NULL OR m.mood ILIKE '%' || $4::text || '%')
    `;

    const result = await db.query(query, [medium, title, recommender, mood]);
    
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});


// app.get('/recommendations', async (req, res) => {
  
//   try {
//     const query = `
//       SELECT
//         recommendations.recommendation_id AS rec_id,
//         recommendations.title AS rec_title,
//         media.medium_type,
//         recommendations.recommender,
//         newMoods.mood_types
//       FROM recommendations
//       INNER JOIN media ON (recommendations.medium = media.medium_type)
//       LEFT JOIN (
//         SELECT
//           recommendation_id,
//           string_agg(username, ', ') AS recommender
//         FROM users
//         JOIN recommendations AS r ON (users.user_id = r.user_id)
//         GROUP BY recommendation_id
//       ) AS recommender_subquery ON recommender_subquery.recommendation_id = recommendations.recommendation_id
//       LEFT JOIN (
//         SELECT
//           recommendation_id,
//           string_agg(mood, ', ') AS mood_types
//         FROM moods
//         GROUP BY recommendation_id
//       ) AS newMoods ON newMoods.recommendation_id = recommendations.recommendation_id
//       ORDER BY recommendations.recommendation_id;
//     `;

//     const { rows } = await db.query(query);

//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
