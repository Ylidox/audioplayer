let express = require('express');

let app = express();
let userRouter = require('./Routers/userRouter');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/user', userRouter);
app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));

