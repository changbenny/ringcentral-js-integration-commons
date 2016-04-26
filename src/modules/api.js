import Wrapper from '../lib/wrapper';

const AUTH = Symbol();
const PLATFORM = Symbol();

export default class Api {
  constructor({
    auth,
    platform
  }) {
    this[AUTH] = auth;
    this[PLATFORM] = platform;
  }
}