import express from 'express';
import cors from 'cors';
import ConnectDB from './src/config/db.js';
import AuthRoutes from './src/routes/AuthRoutes.js';
import ContentRoutes from './src/routes/ContentRoutes.js';
import OutlineRoutes from './src/routes/OutlinesRoutes.js';
import QuizRoutes from './src/routes/QuizRoutes.js';



const app = express();

app.use(cors(
    {
        origin : "*"
    }
));

app.use(express.json());


app.use('/auth',AuthRoutes );
app.use('/content',ContentRoutes );
app.use('/outlines',OutlineRoutes );
app.use('/quiz',QuizRoutes );


app.get('/', (req, res) => {
    res.send('Kurio Rest API');
}
);

const PORT = process.env.PORT || 8080;
ConnectDB();
app.listen(PORT, () =>
    console.log(`Kurio app listening on port ${PORT}!`),
);



await User.findOneAndDelete({ email: "badlamousssab@gmail.con" })
console.log("User deleted");


