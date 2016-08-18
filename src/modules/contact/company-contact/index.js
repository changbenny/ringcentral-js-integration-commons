import RcModule from '../../../lib/rc-module';
import SymbolMap from 'data-types/symbol-map';
import KeyValueMap from 'data-types/key-value-map';
import reducer from './company-contact-reducer';
import actions from './company-contact-actions';

import { fetchList, extractData } from '../../../lib/utils';

const symbols = new SymbolMap([
  'api',
  'platform',
  'settings',
]);

/**
 * @class
 * @description Contact module
 */
export default class CompanyContact extends RcModule {
  /**
   * @function
   */
  constructor(options) {
    super({
      ...options,
      actions,
    });
    const {
      api,
      platform,
      settings,
    } = options;
    this[symbols.api] = api;
    this[symbols.platform] = platform;
    this[symbols.settings] = settings;

    platform.on(platform.events.loginSuccess, () => {
      this.loadCompanyContact();
    });

    (async () => {
      if (await platform.loggedIn()) {
        await this.loadCompanyContact();
      }
    })();
  }

  async loadCompanyContact({
    userOptions = {},
    perPage = 'max',
  } = {}) {
    this.store.dispatch({
      type: this.actions.loadCompanyContact,
    });
    try {
      const contacts = extractData(await this::fetchList(options => (
        this[symbols.api].account().extension().list({
          ...options,
          ...userOptions,
          perPage,
        })
      )));
      this.store.dispatch({
        type: this.actions.loadCompanyContactSuccess,
        payload: contacts,
      });
    } catch (error) {
      this.store.dispatch({
        type: this.actions.loadAddressBookFailed,
        error,
      });
    }
  }

  get reducer() {
    return reducer(this.prefix);
  }
}
