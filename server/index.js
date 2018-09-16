require("dotenv").config();

app.listen(port, () => {
  console.log(`A quokka is listening on port ${port}.`);
  console.log(`${process.env.NODE_ENV} - ${process.env.PORT}`);
});


