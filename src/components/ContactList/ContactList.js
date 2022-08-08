import { ContactListItem } from './ContactListItem/ContactListItem';

import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from 'redux/contacts/contacts-actions';
import {
  filterSelector,
  itemsSelector,
} from 'redux/contacts/contacts-selectors';

export const ContactList = () => {
  const items = useSelector(itemsSelector);
  const filter = useSelector(filterSelector);
  const dispatch = useDispatch();
  const contacts = items.filter(({ name }) =>
    name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

  return (
    <ul>
      {contacts.map(({ id, name, number }) => {
        return (
          <ContactListItem
            key={id}
            id={id}
            name={name}
            phone={number}
            onDelete={id => dispatch(deleteUser(id))}
          />
        );
      })}
    </ul>
  );
};
