import styles from '../Filter/Filter.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { filterUser } from 'redux/contacts/contacts-actions';
import { filterSelector } from 'redux/contacts/contacts-selectors';

export const Filter = () => {
  const filter = useSelector(filterSelector);
  const dispatch = useDispatch();

  return (
    <label className={styles.label}>
      Find contact by name
      <input
        type="text"
        name="name"
        onChange={el => dispatch(filterUser(el.target.value))}
        value={filter}
        className="input"
      />
    </label>
  );
};
