import express from 'express';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();
const port = process.env.PORT_SERVER || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('SERVER E-COMMERCE ĐÃ CHẠY');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
