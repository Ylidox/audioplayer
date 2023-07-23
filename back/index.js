let express = require('express');

let app = express();
let userRouter = require('./Routers/userRouter');
let audioRouter = require('./Routers/audioRouter');
let fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(fileUpload({
    createParentPath:true
}));

app.use('/user', userRouter);
app.use('/audio', audioRouter);
app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));

