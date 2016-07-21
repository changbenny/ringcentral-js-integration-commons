import callActions from './call-actions';
import callStatus from '../../enums/call-status';

const initialState = {
  status: [],
};

function contain(arr, ele) {
  return arr.indexOf(ele) > -1;
}

function remove(arr, ele) {
  if (contain(arr, ele)) {
    arr.splice(arr.indexOf(ele), 1);
  }
  return arr;
}

export default function (state, action) {
  if (typeof state === 'undefined') return Object.assign({}, initialState);
  if (!action) return state;
  switch (action.type) {

    case callActions.record:
      return Object.assign({}, state, {
        status: contain(state.status, callStatus.recording) ?
                  state.status :
                  state.status.concat(callStatus.recording),
      });
    case callActions.stopRecord:
      return Object.assign({}, state, {
        status: remove(state.status, callStatus.recording),
      });
    case callActions.mute:
      return Object.assign({}, state, {
        status: contain(state.status, callStatus.muted) ?
                  state.status :
                  state.status.concat(callStatus.muted),
      });
    case callActions.unmute:
      return Object.assign({}, state, {
        status: remove(state.status, callStatus.muted),
      });
    case callActions.hold:
      return Object.assign({}, state, {
        status: contain(state.status, callStatus.holding) ?
                  state.status :
                  state.status.concat(callStatus.holding),
      });
    case callActions.unhold:
      return Object.assign({}, state, {
        status: remove(state.status, callStatus.holding),
      });
    case callActions.park:
      return Object.assign({}, state, {
        status: remove(state.status, callStatus.parked),
      });
    case callActions.transfer:
      return Object.assign({}, state, {
        status: contain(state.status, callStatus.transfered) ?
                  state.status :
                  state.status.concat(callStatus.transfered),
        target: action.number,
      });

    default:
      return state;
  }
}
