const { program } = require("commander");

const contacts = require("./db/contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allIds = await contacts.listContacts();
      return console.table(allIds);
    case "get":
      const getContactById = await contacts.getContactById(id);
      return console.log(getContactById);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
// invokeAction({ action: "show" });

// invokeAction({ action: "get", id: "05olLMgyVQdWRwgKfg5J6" });

// invokeAction({
//   action: "add",
//   id: "05olLMgyVQdWRwgKfg5J6",
//   name: "Cyrus Jackson",
//   email: "nibh@semsempererat.com",
// });

program
  .option("-a, --action, <type>")
  .option("-i, --id, <type>")
  .option("-n,--name, <type>")
  .option("-e,--email, <type>")
  .option("-ph,--phone, <type>");

program.parse();

const options = program.opts();
invokeAction(options);