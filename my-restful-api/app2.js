const express = require("express");
const app = express();
 
const users = [
  {
    id: 1,
    full_name: "oainger0@craigslist.org",
    movies: "Reckless"
  },
  {
    id: 2,
    full_name: "hblything1@de.vu",
    movies: "When a Man Loves a Woman"
  },
  {
    id: 3,
    full_name: "sivermee2@vkontakte.ru",
    movies: "Creature"
  },
  {
    id: 4,
    full_name: "agreenan3@barnesandnoble.com",
    movies: "Sex and Zen (Rou pu Tuan zhi tou Qing bao Jian)"
  },
  {
    id: 5,
    full_name: "sthirst4@blog.com",
    movies: "Des roses en hiver"
  },
  {
    id: 6,
    full_name: "loak5@nifty.com",
    movies: "The Magical Legend of the Leprechauns"
  },
  {
    id: 7,
    full_name: "ebroadey6@guardian.co.uk",
    movies: "Marilena de la P7"
  },
  {
    id: 8,
    full_name: "dtoupe7@surveymonkey.com",
    movies: "Battle of Algiers, The (La battaglia di Algeri)"
  },
  {
    id: 9,
    full_name: "jborsnall8@mediafire.com",
    movies: "Winning of Barbara Worth, The"
  },
  {
    id: 10,
    full_name: "cbogace9@jigsy.com",
    movies: "Beijing Taxi"
  }
];
 
// get all results
app.get("/users", (req, res) => {
  res.json(users);
});
 
// get paginated results
app.get("/users/paginate", paginatedResults(users), (req, res) => {
  res.json(res.paginatedResults);
});
 
function paginatedResults(model) {
  // middleware function
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    app.get('/', (req, res) => {
      logger.info('Akses ke halaman utama'); // Logging informasi
      res.send('Halaman Utama');
    });
    
    app.use((err, req, res, next) => {
      logger.error('Terjadi kesalahan:', err); // Logging error
      res.status(500).send('Terjadi kesalahan');
    });
    
    // calculating the starting and ending index
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
 
    const results = {};
    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }
 
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }
 
    results.results = model.slice(startIndex, endIndex);
 
    res.paginatedResults = results;
    next();
  };
}
 
const port = 3000;
const url = "http://localhost:" + port;
app.listen(port, () => {
  console.log("Service endpoint= %s", url);
});
