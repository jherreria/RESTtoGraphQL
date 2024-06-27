import { resolvers } from './resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDefs = `
  type Contact {
    id: ID
    firstName: String
    lastName: String
    email: String
    company: String  
  }

  type Query {
    getContacts: [Contact]
    getContact(id: ID!): Contact
  }

  input ContactInput {
    id: ID  
    firstName: String
    lastName: String
    email: String
    company: String
  }
  
  input ContactUpdate{
    id: ID!
    firstName: String
    lastName: String
    email: String
    company: String
  }
  
  type Mutation {
    createContact(input: ContactInput): Contact
    updateContact(update: ContactUpdate): Contact
    deleteContact(id: ID!): String    
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers});

export  {schema};

//src/data/schema.js