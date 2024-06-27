import { Contacts } from './dbConnectors';

export const resolvers = {
  Query: {
    getContacts: () => { 
      return Contacts.find();
    },
    getContact: async (root, args) => {
      try{
        const contact =await Contacts.findById(args.id);
        return contact;
      }catch(err){
        throw new Error('Error getting contact: ' + err.message);
      } 
    }
  },
  Mutation: {
    createContact: async (root, args) => {
      // console.log("\ncreateContact: ",args);
      const newContact = new Contacts({
        firstName: args.input.firstName,
        lastName: args.input.lastName,
        email: args.input.email,
        company: args.input.company
      });
      newContact.id = newContact._id;
      // Fails using promise: MongooseError: Model.prototype.save() no longer accepts a callback
      // return new Promise((resolve, reject) => {
      //   newContact.save((err, contact) => {
      //     if (err) {
      //       reject(err);
      //     } else {
      //       resolve(contact);
      //     }
      //   });
      // });
      // try-catch works
      try {
        await newContact.save();
        return newContact;
      } catch (err) {
        throw new Error('Error saving contact: ' + err.message);
      }      
    },
    updateContact: async (root, args) => {
      // console.log("\nupdateContact: ",args);
      try {
        //Delta only appraoch
        const updfields = {
          id: args.update.id,
          firstName: args.update?.firstName,
          lastName: args.update?.lastName,
          email: args.update?.email,
          company: args.update?.company
        }
        // upsert: true -> insert if not found --- new:true return the updated doc
        const contact = await Contacts.findOneAndUpdate({_id: args.id}, updfields, { upsert: true, new: true});
        return contact;
      } catch (err) {
        throw new Error('Error updating contact: ' + err.message);
      }
    },
    deleteContact: async (root, args) =>{
      // console.log("\ndeleteContact: ",args);
      try {
        const contact = await Contacts.findByIdAndDelete({_id: args.id});        
        return (contact)? "Contact deleted": "Crickets!"; 
      } catch (err) {
        console.error("/n DeleteContact error", err)
        throw new Error('Error deleting contact: ' + err.message);
      }
    }

  },

}