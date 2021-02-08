export default class GenericError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GenericError';
  }
}
