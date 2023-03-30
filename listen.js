const app = require("./index");

const { PORT = 9091 } = process.env;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
