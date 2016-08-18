import { prefixActions } from '../../../lib/redux-helper';
import companyContactActions from './company-contact-actions';

const initialState = {
  companyContact: null,
  companyContactLoading: false,
  companyContactError: null,
};

export default function getReducer(prefix) {
  const actions = prefixActions(companyContactActions, prefix);

  return (state, action) => {
    if (typeof state === 'undefined') return Object.assign({}, initialState);
    if (!action) return state;
    switch (action.type) {

      case actions.loadCompanyContact:
        return Object.assign(
          {},
          state,
          {
            companyContactLoading: true,
          },
        );
      case actions.loadCompanyContactSuccess:
        return Object.assign(
          {},
          state,
          {
            companyContact: action.payload,
            companyContactLoading: false,
            companyContactError: null,
          },
        );
      case actions.loadCompanyContactFailed:
        return Object.assign(
          {},
          state,
          {
            companyContactLoading: false,
            companyContactError: action.error,
          },
        );

      default:
        return state;
    }
  };
}
