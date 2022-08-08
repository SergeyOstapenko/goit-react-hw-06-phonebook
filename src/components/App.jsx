import { useEffect, useState } from 'react';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Form } from './Form/Form';
import { Container } from './Container/Container';

const CONTACTS_KEY = 'contacts-list';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return localStorage.getItem(CONTACTS_KEY)
      ? JSON.parse(localStorage.getItem(CONTACTS_KEY))
      : [
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handlerFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const getVisableContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };
  const handlerDelete = id => {
    setContacts(contacts.filter(contact => id !== contact.id));
  };

  const handlerSubmit = data => {
    const inContacts = contacts.some(
      contact =>
        data.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()
    );
    if (inContacts) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    setContacts(prev => [...prev, data]);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Container title="Phonebook">
        <Form onSubmit={handlerSubmit} />
      </Container>
      <Container title="Contacts">
        <Filter filter={filter} handlerFilter={handlerFilter} />
        <ContactList contacts={getVisableContacts()} onDelete={handlerDelete} />
      </Container>
    </div>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//     name: '',
//     number: '',
//   };

//   componentDidMount() {
//     const contacts = (localStorage.getItem('contacts'));
//     if(contacts) {
//       this.setState({contacts:JSON.parse(contacts)})
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if(prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
//     }
//   }

//   handlerSubmit = data => {
//     const inContacts = this.state.contacts.some(
//       contact =>
//         data.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()
//     );
//     if (inContacts) {
//       alert(`${data.name} is already in contacts`);
//       return;
//     }

//     this.setState(prev => {
//       return { contacts: [...prev.contacts, data] };
//     });
//   };

//   handlerFilter = ({ target: { value } }) => {
//     this.setState({ filter: value });
//   };

//   getVisableContacts = () => {
//     const { contacts, filter } = this.state;

//     return contacts.filter(({ name }) => {
//       return name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
//     });
//   };
//   handlerDelete = id => {
//     this.setState({
//       contacts: this.state.contacts.filter(contact => id !== contact.id),
//     });
//   };

//   render() {
//     const { filter } = this.state;
//     return (
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           fontSize: 40,
//           color: '#010101',
//         }}
//       >
//         <Container title="Phonebook">
//           <Form onSubmit={this.handlerSubmit} />
//         </Container>
//         <Container title="Contacts">
//           <Filter filter={filter} handlerFilter={this.handlerFilter} />
//           <ContactList
//             contacts={this.getVisableContacts()}
//             onDelete={this.handlerDelete}
//           />
//         </Container>
//       </div>
//     );
//   }
// }
