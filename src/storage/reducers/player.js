const defaultValue = {
  player: undefined,
  type: undefined,
};

const player = (state = defaultValue, action) => {
  switch (action.type) {
    case 'player/select':
      return {
        player: action.player,
        type: state.type,
      };
    case 'player/type':
      return {
        type: action.playerType,
        player: state.player,
      };
    default:
      return state;
  }
};

export default player;
