require("dotenv").config();
const { createApp } = require("./app");

const port = Number(process.env.PORT || 3002);
createApp().listen(port, () => console.log(`Brivent API listening on port ${port}`));
