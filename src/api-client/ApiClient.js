import axios from 'axios';
import GenericError from '../errors/genericError';
import AutheError from '../errors/authError';

export default class ApiClient {
  constructor() {
    this.url = 'http://192.168.0.226:8080/';
    this.endpoits = {
      login: 'auth/login',
      session: { new: 'game-sessions/', find: 'game-sessions/$id' },
      player: { id: 'players/$id' },
      factory: { id: 'factories/$id' },
      orders: { new: 'orders/', deliver: 'orders/$id/deliver' },
    };
    this.requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  async createNewSession(name, password) {
    return this.post(this.url + this.endpoits.session.new, {
      name: name,
      password: password,
    });
  }

  async login(name, password) {
    return this.post(this.url + this.endpoits.login, {
      username: name,
      password: password,
    });
  }

  async getSession(id) {
    return this.get(this.url + this.endpoits.session.find.replace('$id', id));
  }

  async updatePlayer(role, data) {
    return this.patch(
      this.url + this.getEndpoint(role).id.replace('$id', data.id),
      data
    );
  }

  async updateFactory(data) {
    return this.patch(
      this.url + this.endpoits.factory.id.replace('$id', data.id),
      data
    );
  }

  async getPlayer(role, id) {
    return this.get(this.url + this.getEndpoint(role).id.replace('$id', id));
  }

  async createNewOrder(session, type) {
    return this.post(this.url + this.endpoits.orders.new, {
      session: session,
      type: type,
    });
  }

  async deliverOrder(order) {
    return this.patch(
      this.url + this.endpoits.orders.deliver.replace('$id', order.id),
      order
    );
  }

  async post(url, data) {
    return axios
      .post(url, data, this.requestConfig)
      .then((response) => response.data)
      .catch((error) => {
        const actualError =
          error.response.status === 401
            ? new AutheError('invalid session or passowrd')
            : new GenericError('semething went wrong');
        throw actualError;
      });
  }

  async get(url) {
    return axios
      .get(url, this.requestConfig)
      .then((response) => response.data)
      .catch(() => {
        throw new GenericError('semething went wrong');
      });
  }

  async patch(url, data) {
    return axios
      .patch(url, data, this.requestConfig)
      .then((response) => response.data)
      .catch(() => {
        throw new GenericError('semething went wrong');
      });
  }

  getEndpoint(role) {
    return role === 'factory' ? this.endpoits.factory : this.endpoits.player;
  }
}
