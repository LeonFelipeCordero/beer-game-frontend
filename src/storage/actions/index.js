export const updateSession = (session) => {
  return {
    type: 'session/update',
    session: session,
  };
};

export const updatePlayer = (player) => {
  return {
    type: 'player/select',
    player: player,
  };
};

export const setPlayerType = (playerType) => {
  return {
    type: 'player/type',
    playerType: playerType,
  };
};
