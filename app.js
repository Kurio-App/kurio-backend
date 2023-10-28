import express from 'express';
import cors from 'cors';
import ConnectDB from './src/config/db.js';
import AuthRoutes from './src/routes/AuthRoutes.js';
import StoryRoutes from './src/routes/StoriesRoutes.js';
import OutlineRoutes from './src/routes/OutlinesRoutes.js';

import User from './src/models/User.js';

const app = express();

app.use(cors(
    {
        origin : "*"
    }
));

app.use(express.json());


app.use('/auth',AuthRoutes );
app.use('/stories',StoryRoutes );
app.use('/outlines',OutlineRoutes );


app.get('/', (req, res) => {
    res.send('Kurio Rest API');
}
);

const PORT = process.env.PORT || 8080;
ConnectDB();
app.listen(PORT, () =>
    console.log(`Kurio app listening on port ${PORT}!`),
);

// Path: .env


// await User.findOneAndDelete({ email: "ja_bouchouareb@esi.dz" })
// console.log("User deleted");


