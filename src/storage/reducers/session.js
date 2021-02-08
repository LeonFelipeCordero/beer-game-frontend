const defaultValue = {
  session: undefined,
};

const session = (state = defaultValue, action) => {
  switch (action.type) {
    case 'session/update':
      return {
        session: action.session,
      };
    default:
      return state;
  }
};

export default session;
