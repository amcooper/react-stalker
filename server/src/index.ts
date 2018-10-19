import dotenv from "dotenv";
dotenv.config();
import app from "./server";
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`A quokka is listening on port ${port}.`);
  console.log(`${process.env.NODE_ENV} - ${process.env.PORT}`);
});
