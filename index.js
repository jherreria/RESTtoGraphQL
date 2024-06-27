import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './src/data/schema';

const app = express();
const PORT = 3000;

// serving static files
app.use(express.static('public'));

// Set up Graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,    
    graphiql: true, // Enables the Graphiql IDE
}));

app.listen(PORT, () => 
    console.log(`Your server is running on port ${PORT}/graphql`)
);
