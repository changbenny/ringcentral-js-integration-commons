import { prefixActions } from '../../lib/redux-helper';
import webphoneActions from './webphone-actions';
import webphoneStatus from '../../enums/webphone-status';

import callReducer from './call-reducer';

const initialState = {
  status: webphoneStatus.preRegister,
  // assign from UI
  toNumber: '',
  fromNumber: '',
  // sip info return from sip server
  callLineInfo: null,
  operation: callReducer(),
};

export default function getReducer(prefix) {
  const actions = prefixActions(webphoneActions, prefix);

  return (state, action) => {
    if (typeof state === 'undefined') return Object.assign({}, initialState);
    if (!action) return state;
    switch (action.type) {

      case actions.registerSuccess:
        return Object.assign({}, state, {
          status: webphoneStatus.registerSuccessed,
        });
      case actions.registerError:
        return Object.assign({}, state, {
          status: webphoneStatus.registerFailed,
          error: action.error,
        });
      case actions.unregister:
        return Object.assign({}, state, {
          status: webphoneStatus.preRegister,
          operation: callReducer(state.operation, action.operation),
        });
      case actions.call:
        return Object.assign({}, state, {
          status: webphoneStatus.callConnecting,
          toNumber: action.payload.toNumber,
          fromNumber: action.payload.fromNumber,
        });
      case actions.callIncoming:
        return Object.assign({}, state, {
          status: webphoneStatus.callIncoming,
        });
      // TODO: update fromNumber, toNumber
      case actions.callConnect:
        return Object.assign({}, state, {
          status: webphoneStatus.callConnected,
          callLineInfo: action.payload,
        });
      case actions.callEnd:
        return Object.assign({}, state, {
          status: webphoneStatus.registerSuccessed,
          operation: {
            status: [],
          },
        });
      case actions.callError:
        return Object.assign({}, state, {
          status: webphoneStatus.callFailed,
          error: action.error,
        });
      case actions.callOperation:
        return Object.assign({}, state, {
          operation: callReducer(state.operation, action.operation),
        });

      default:
        return state;
    }
  };
}
