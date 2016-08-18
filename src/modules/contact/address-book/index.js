import RcModule from '../../../lib/rc-module';
import SymbolMap from 'data-types/symbol-map';
import KeyValueMap from 'data-types/key-value-map';
import reducer from './address-book-reducer';
import actions from './address-book-actions';

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
export default class AddressBook extends RcModule {
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
        await this.loadAddressBook();
      }
    })();
  }

  async loadAddressBook({
    userOptions = {},
    perPage = 'max',
  } = {}) {
    this.store.dispatch({
      type: this.actions.loadAddressBook,
    });
    try {
      const book = extractData(await this::fetchList(options => (
        this[symbols.api].account().extension().addressBook().contact().get({
          ...options,
          ...userOptions,
          perPage,
        })
      )));
      this.store.dispatch({
        type: this.actions.loadAddressBookSuccess,
        payload: book,
      });
    } catch (error) {
      console.error(error);
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
