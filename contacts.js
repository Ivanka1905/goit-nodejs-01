const fsp = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function rewriteContactsList(a) {
  const newList = await fsp.writeFile(
    contactsPath,
    JSON.stringify(a, null, "\t")
  );
  return newList;
}

async function listContacts() {
  try {
    const allContacts = await fsp.readFile(contactsPath);
    return JSON.parse(allContacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const allContacts = await listContacts();
    const contactById = allContacts.find(({ id }) => id === contactId);
    console.log(contactById);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const filteredContacts = await allContacts.filter(
      ({ id }) => id !== contactId
    );
    rewriteContactsList(filteredContacts);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    console.log(newContact);
    const allContacts = await listContacts();
    rewriteContactsList([newContact, ...allContacts]);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
