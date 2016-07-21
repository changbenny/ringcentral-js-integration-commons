import Enum from '../lib/enum';

const definition = {
  flip: 'FLIPED',
  recording: 'RECORDING',
  holding: 'HOLDING',
  muted: 'MUTED',
  parked: 'PARKED',
  transfered: 'TRANSFERED',
  forwarded: 'FOWARDED',
};

export default new Enum(definition);
