const fsp = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

// console.log(path.resolve('contacts.json'))
const contactsPath = path.join(__dirname, "db/contacts.json");
// console.log(contactsPath);

async function listContacts() {
  const contacts = await fsp.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  // console.log(parsed);
  return parsedContacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((c) => c.id === contactId);
  if (!contactById) {
    return null;
    // throw new Error('The contact is not found')
  }
  console.log(contactById);
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIndex = await parsed.findIndex((c) => c.id === contactId);
    if (contactIndex === -1) {
        return null;
  }
    const newList = await fsp.writeFile("./db/contacts.json", data);
  result.splice(contactIndex, 1);
  console.log();
}

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  console.log(newContact);
  const contacts = await listContacts();
  contacts.push(newContact);
  await fsp.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

// listContacts();
// getContactById("vza2RIzNGIwutCVCs4mCL");
// removeContact("vza2RIzNGIwutCVCs4mCL")
addContact("Ivanka", "IvNagornyuk@gmail.com", "380-660-17-7234");
