# Migrating from REST to Grapqh

## Linkedin Leraning
https://www.linkedin.com/learning/migrating-from-rest-to-graphql-23466102/add-a-few-items-with-graphiql?u=107509210

## Configure MongoDB connection
create `config.json` file as a sibling of `index.js`. Content below replacing <<99999>> with your cluster number and <<password>> with your password.
```
{
  "mongoDB_URI": "mongodb+srv://Cluster<<99999>>:<<password>>@cluster<<99999>>.mgd9yxt.mongodb.net/?appName=Cluster<<99999>>"
}
```


## initila steps
Unzip the `Ex_Files_Migrating_REST_GraphQL.zip`, move the `Resources` folder and rename it like `RESTtoGraphQL`.
`npm install`
`npm start`
  - check localhots:3000 says that it's running
`npm uninstall body-parser`
`npm i graphql express-graphql`