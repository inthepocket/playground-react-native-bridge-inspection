const state = {
  members: [],
  selectedMembers: []
};

export const getState = () => state;

export function setState(newState) {
  Object.assign(state, newState);
  this.forceUpdate && this.forceUpdate();
}
