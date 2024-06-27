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
    },
    searchContacts: async (root, args) => {
      try {
        const searchTerm = args.query;
        const regex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive search
        const contacts = await Contacts.find({
          $or: [
            { firstName: { $regex: regex } },
            { lastName: { $regex: regex } },
            { email: { $regex: regex } },
            { company: { $regex: regex } }
          ]
        });
        return contacts;
      } catch (err) {
        throw new Error('Error searching contacts: ' + err.message);
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
        //Delta appraoch
        let updfields = await resolvers.Query.getContact("",{id:args.update.id});
        let contacto = updfields.toObject();
        contacto = {          
          firstName: args.update?.firstName? args.update.firstName: contacto.firstName,
          lastName: args.update?.lastName? args.update.lastName: contacto.lastName,
          email: args.update?.email? args.update.email: contacto.email,
          company: args.update?.company? args.update.company: contacto.company
        }

        // upsert: true -> insert if not found --- new:true return the updated doc
        const updatedContact = await Contacts.findOneAndUpdate({_id: args.id}, contacto, { upsert: true, new: true});
        return updatedContact;
        
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