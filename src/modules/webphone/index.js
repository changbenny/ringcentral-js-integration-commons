import RcModule from '../../lib/rc-module';
import SymbolMap from '../../lib/symbol-map';
import webphoneActions from './webphone-actions';
import callActions from './call-actions';
import getReducer from './webphone-reducer';
import Emitter from 'event-emitter';
import RingCentralWebphone from 'ringcentral-web-phone';
import webphoneStatus from '../../enums/webphone-status';
import callStatus from '../../enums/call-status';

const symbols = new SymbolMap([
  'api',
  'platform',
  'emitter',
  'settings',
  'phoneInstance',
]);

async function initPhoneInstance() {
  const info = await this[symbols.platform]
    .post('/client-info/sip-provision', {
      sipInfo: [{ transport: 'WSS' }],
    })
    .then(res => res.json());
  return new RingCentralWebphone(info, {
    logLevel: 0,
    audioHelper: {
      enabled: false,
    },
  });
}

async function record(flag = true) {
  if (!flag) {
    await this.currentSession.stopRecord();
    this.store.dispatch({
      type: this.actions.callOperation,
      operation: {
        type: callActions.stopRecord,
      },
    });
  } else {
    await this.currentSession.startRecord();
    this.store.dispatch({
      type: this.actions.callOperation,
      operation: {
        type: callActions.record,
      },
    });
  }
}

async function mute(flag = true) {
  if (!flag) {
    await this.currentSession.unmute();
    this.store.dispatch({
      type: this.actions.callOperation,
      operation: {
        type: callActions.unmute,
      },
    });
  } else {
    await this.currentSession.mute();
    this.store.dispatch({
      type: this.actions.callOperation,
      operation: {
        type: callActions.mute,
      },
    });
  }
}

async function hold(flag = true) {
  if (!flag) {
    await this.currentSession.unhold();
    this.store.dispatch({
      type: this.actions.callOperation,
      operation: {
        type: callActions.unhold,
      },
    });
  } else {
    await this.currentSession.hold();
    this.store.dispatch({
      type: this.actions.callOperation,
      operation: {
        type: callActions.hold,
      },
    });
  }
}

async function park() {
  await this.currentSession.park();
  this.store.dispatch({
    type: this.actions.callOperation,
    operation: {
      type: callActions.park,
    },
  });
}

async function transfer(number) {
  this.checkSession();
  await this.currentSession.transfer(number);
  this.store.dispatch({
    type: this.actions.callOperation,
    operation: {
      type: callActions.transfer,
      payload: {
        number,
      },
    },
  });
}

async function flip(number) {
  this.checkSession();
  await this.currentSession.flip(number);
  this.store.dispatch({
    type: this.actions.callOperation,
    operation: {
      type: callActions.flip,
      payload: {
        number,
      },
    },
  });
}

async function dtmf(number) {
  this.checkSession();
  await this.currentSession.dtmf(number);
  this.store.dispatch({
    type: this.actions.callOperation,
    operation: {
      type: callActions.dtmf,
      payload: {
        number,
      },
    },
  });
}

async function operations(name, ...args) {
  const actions = { record, mute, hold, park, transfer, flip, dtmf };
  this.checkSession();
  try {
    await actions[name].call(this, ...args);
  } catch (error) {
    this.store.dispatch({
      type: this.actions.callOperation,
      operation: {
        type: callActions.error,
        error,
      },
    });
    // TODO: needed?
    throw error;
  }
}

export default class Webphone extends RcModule {
  constructor(options) {
    super({
      ...options,
      actions: webphoneActions,
    });
    const {
      api,
      platform,
      settings,
    } = options;
    this[symbols.api] = api;
    this[symbols.platform] = platform;
    this[symbols.emitter] = new Emitter();
    this[symbols.settings] = settings;

    this.currentSession = null;
    this.isRegistered = false;

    // TODO: commented out until setting module completed
    // settings.registerReducer('webphone', getWebphoneReducer())

    platform.on(platform.events.loginSuccess, async () => {
      this[symbols.phoneInstance] = await this::initPhoneInstance();
      this[symbols.phoneInstance].userAgent.on('registered', () => {
        // sip will fire multiple registered events, only dispatch one register action to state.
        // TODO: is this isRegistered state needed to be store as instance variable
        //       or just check store state
        if (!this.isRegistered) {
          this.store.dispatch({
            type: this.actions.registerSuccess,
          });
        }
        this.isRegistered = this[symbols.phoneInstance].userAgent.isRegistered();
      });
      this[symbols.phoneInstance].userAgent.on('unregistered', () => {
        this.isRegistered = this[symbols.phoneInstance].userAgent.isRegistered();
        this.store.dispatch({
          type: this.actions.unregister,
          operation: {
            type: callActions.clear,
          },
        });
      });
      this[symbols.phoneInstance].userAgent.on('registrationFailed', (error) => {
        this.store.dispatch({
          type: this.actions.registerError,
          error,
        });
      });
      this[symbols.phoneInstance].userAgent.on('invite', (session) => {
        this.currentSession = session;
        this.listenSessionEvents();
        console.log(session);
        this.store.dispatch({
          type: this.actions.callIncoming,
          payload: {
            remoteIdentity: session.remoteIdentity,
            localIdentity: session.localIdentity,
          },
        });
      });
    });
  }

  get reducer() {
    return getReducer(this.prefix);
  }

  /**
   * Make a phone call, this method should be called in registerSuccess state
   * @param {string} toNumber
   * @param {string} [fromNumber]
   * @return {Session}
   */
  async call({ toNumber, fromNumber, media }) {
    this.store.dispatch({
      type: this.actions.call,
      payload: {
        toNumber,
        fromNumber,
      },
    });
    this.currentSession = this[symbols.phoneInstance].userAgent.invite(toNumber, {
      media: {
        render: media,
      },
    });
    this.listenSessionEvents();
    try {
      await this.currentSession;
    } catch (error) {
      this.store.dispatch({
        type: this.actions.callError,
        error,
      });
    }
    return this.currentSession;
  }

  /**
   * Accept a phone call, this method should be called when call is incoming
   * @param {Object} media, see https://github.com/ringcentral/ringcentral-web-phone#accepting-incoming-call
   * @return {Promise}
   */
  async accept(media) {
    this.checkSession();
    return await this.currentSession.accept(media);
  }

  async bye() {
    this.checkSession();
    return await this.currentSession.terminate();
  }

  async record(flag) {
    operations.call(this, 'record', flag);
  }

  async mute(flag) {
    operations.call(this, 'mute', flag);
  }

  async hold(flag) {
    operations.call(this, 'hold', flag);
  }

  async park(flag) {
    operations.call(this, 'park', flag);
  }

  async transfer(number) {
    operations.call(this, 'transfer', number);
  }

  async flip(number) {
    operations.call(this, 'flip', number);
  }

  async dtmf(number) {
    operations.call(this, 'dtmf', number);
  }

  checkSession() {
    if (!this.currentSession) {
      this.store.dispatch({
        // TODO
        type: this.actions.sessionError,
      });
      throw Error('No active session');
    }
  }

  /**
   * Internal method for listen session events
   */
  listenSessionEvents() {
    this.currentSession.on('accepted', (response, cause) => {
      console.log(response);
      // accepted event for outbound call will returne a incomingResponse
      if (response.data) {
        this.store.dispatch({
          type: this.actions.callConnect,
          payload: {
            remoteIdentity: response.to,
            localIdentity: response.from,
          },
        });
      // accepted event for inbound call will only contain a row sip data
      } else {
        this.store.dispatch({
          type: this.actions.callAccept,
        });
      }
    });
    this.currentSession.on('rejected', (response, cause) => {
      this.store.dispatch({
        type: this.actions.callEnd,
      });
      this.currentSession = null;
    });
    this.currentSession.on('terminated', (response, cause) => {
      this.store.dispatch({
        type: this.actions.callEnd,
        error: cause,
      });
      this.currentSession = null;
    });
    this.currentSession.on('bye', (request) => {
      this.store.dispatch({
        type: this.actions.callEnd,
      });
      this.currentSession = null;
    });
  }
}
