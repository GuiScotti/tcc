export default {
    setContacts(state, contacts) {
        state.contacts = contacts;
    },
    addContact(state, contact) {
        state.contacts.push(contact);
    },
    clearContacts(state) {
        state.contacts = [];
    },
    deleteContact(state, contact_id) {
        state.contacts = state.contacts.filter(c => c.id !== contact_id);
    },
    editContact(state, contact){
        const index = state.contacts.findIndex(c => c.id === contact.id);
        state.contacts[index] = contact.contact;
    }
}   