export const setPropValue = (prop, value) => s => s.set(prop, value);
export const setListValue = (prop, value) => (s) => {
  s.set(prop, value);
};

export function getPropValue(state, reducer, prop) {
  return state.get(reducer).get(prop);
}