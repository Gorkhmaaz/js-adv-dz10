function getContacts() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
        return JSON.parse(contacts);
    } else {
        return [];
    }
}
function saveContacts(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function fetchContacts() {
    const contacts = getContacts();
    const contactsDiv = document.getElementById('contacts');
    contactsDiv.innerHTML = '';
    contacts.forEach(contact => {
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('contact');
        contactDiv.innerHTML = `
        <p>Name: ${contact.name}</p>
        <p>Surname: ${contact.surname}</p>
        <p>Phone: ${contact.phone}</p>
        <p>Email: ${contact.email}</p>
        <button class="deleteButton" data-id="${contact.id}">Delete</button>
      `;
        contactsDiv.appendChild(contactDiv);
    });
}

function addContact() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const contacts = getContacts();
    const newContact = {
        id: Date.now().toString(),
        name,
        surname,
        phone,
        email
    };
    contacts.push(newContact);
    saveContacts(contacts);
    fetchContacts();
}

function deleteContact(id) {
    let contacts = getContacts();
    contacts = contacts.filter(contact => contact.id !== id);
    saveContacts(contacts);
    fetchContacts();
}

document.getElementById('addButton').addEventListener('click', addContact);

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('deleteButton')) {
        const id = event.target.dataset.id;
        deleteContact(id);
    }
});

document.addEventListener('DOMContentLoaded', fetchContacts);
console.log(localStorage.getItem('contacts'));
