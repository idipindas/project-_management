require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db.config');
const PORT = process.env.PORT || 3000;
// app.get('/',"success")

connectDB()
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
