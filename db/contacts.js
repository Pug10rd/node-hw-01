const {nanoid} = require("nanoid")
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const listResult = await listContacts();
  const singleContact = listResult.find(item => item.id === contactId);
  return singleContact || null;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (idContact) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === idContact);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
