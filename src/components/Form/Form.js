import { useState } from 'react';
import { nanoid } from 'nanoid';
import styles from '../Form/Form.module.css';
import PropTypes from 'prop-types';


export const Form = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handlerChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handlerSubmit = e => {
    e.preventDefault();
    const id = nanoid();
    if (!name || !number) {
      alert('Please, fill all fields');
      return;
    }
    onSubmit({ name, number, id });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handlerSubmit} className={styles.form}>
      <label className={styles.label}>
        Name
        <input
          className="input"
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handlerChange}
          required
        />
      </label>
      <label className={styles.label}>
        Number
        <input
          className="input"
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handlerChange}
          required
        />
      </label>
      <button type="submit" className="btn">
        Add contact
      </button>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// const INIT_FORM = {
//   name: '',
//   number: '',
// };

// export class Form extends Component {
//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };
//   state = {
//     ...INIT_FORM,
//   };

//   handlerChange = ({ target: { name, value } }) => {
//     this.setState({ [name]: value });
//   };

//   handlerSubmit = e => {
//     e.preventDefault();
//     const id = nanoid();
//     const { name, number } = this.state;
//     if (!name || !number) {
//       alert('Please, fill all fields');
//       return;
//     }

//     this.props.onSubmit({ ...this.state, id });
//     this.setState({ ...INIT_FORM });
//   };

//   render() {
//     const { name, number } = this.state;
//     return (
//       <form onSubmit={this.handlerSubmit} className={styles.form}>
//         <label className={styles.label}>
//           Name
//           <input
//             className="input"
//             type="text"
//             name="name"
//             value={name}
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             onChange={this.handlerChange}
//             required
//           />
//         </label>
//         <label className={styles.label}>
//           Number
//           <input
//             className="input"
//             type="tel"
//             name="number"
//             value={number}
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             onChange={this.handlerChange}
//             required
//           />
//         </label>
//         <button type="submit" className="btn">
//           Add contact
//         </button>
//       </form>
//     );
//   }
// }