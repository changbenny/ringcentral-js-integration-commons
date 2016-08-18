import { prefixActions } from '../../../lib/redux-helper';
import addressBookActions from './address-book-actions';

const initialState = {
  addressBook: null,
  addressBookLoading: false,
  addressBookError: null,
};

export default function getReducer(prefix) {
  const actions = prefixActions(addressBookActions, prefix);

  return (state, action) => {
    if (typeof state === 'undefined') return Object.assign({}, initialState);
    if (!action) return state;
    switch (action.type) {

      case actions.loadAddressBook:
        return Object.assign(
          {},
          state,
          {
            addressBookLoading: true,
          },
        );
      case actions.loadAddressBookSuccess:
        return Object.assign(
          {},
          state,
          {
            addressBook: action.payload,
            addressBookLoading: false,
            addressBookError: null,
          },
        );
      case actions.loadAddressBookFailed:
        return Object.assign(
          {},
          state,
          {
            addressBookLoading: false,
            addressBookError: action.error,
          },
        );

      default:
        return state;
    }
  };
}
