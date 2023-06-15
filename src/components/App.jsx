import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { MainTitle, SecondTitle, Container } from './App.styled';

const App = () => {
  const userContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? userContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmit = values => {
    const subName = contacts.some(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (subName) {
      return alert(`${values.name} is already in contacts`);
    }
    setContacts(prevState => prevState.concat({ ...values, id: nanoid() }));
  };
  const handleDelete = id => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== id);
    });
  };
  const handleFilterChange = ({ target }) => setFilter(target.value);

  const handleFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  return (
    <Container>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm onSubmit={onSubmit} />
      <SecondTitle>Contacts</SecondTitle>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={handleFilter()} onDeleteContact={handleDelete} />
    </Container>
  );
};
export default App;
