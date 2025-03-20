import "dotenv/config";
import express from "express";
import schoolRouter from "./routes/schoolRoute.js";
import cors from 'cors'

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));


app.use(express.json());
app.get('/',(req,res)=>res.send("Site is live"))
app.use('/schoolAPI',schoolRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
