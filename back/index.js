let express = require('express');
let app = express();

let userRouter = require('./Routers/userRouter');
let audioRouter = require('./Routers/audioRouter');
let playlistRouter = require('./Routers/playlistRouter');

let fileUpload = require('express-fileupload');

const PORT = 3001;

app.use(fileUpload({
    createParentPath:true
}));
app.use(express.json());

app.use('/file', express.static('../file'));
app.use('/user', userRouter);
app.use('/audio', audioRouter);
app.use('/list', playlistRouter);

app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));

