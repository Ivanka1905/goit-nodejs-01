const fsp = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function rewriteContactsList(a) {
  const newList = await fsp.writeFile(contactsPath, JSON.stringify(a, null, 2));
  return newList;
};

async function listContacts() {
  const allContacts = await fsp.readFile(contactsPath);
  const parsedContacts = JSON.parse(allContacts);
  return parsedContacts;
};

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactById = allContacts.find(({ id }) => id === contactId);
  if (!contactById) {
    return null;
  }
  console.log(contactById);
  return contactById;
};

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const contactsFilter = await allContacts.filter(({ id }) => id !== contactId);
  rewriteContactsList(contactsFilter);
};

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  console.log(newContact);
  const allContacts = await listContacts();
  allContacts.push(newContact);
  rewriteContactsList(allContacts);
  return newContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};