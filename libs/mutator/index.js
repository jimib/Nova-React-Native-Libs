export const setPropValue = (prop, value) => s => s.set(prop, value);
export const setListValue = (prop, value) => (s) => {
  s.set(prop, value);
};

export function getPropValue(state, reducer, prop) {
  return state.get(reducer).get(prop);
}

const applyFn = (state, fn) => fn(state);
export const pipe = (fns, state) => state.withMutations(s => fns.reduce(applyFn, s));


export const applyState = (state, changes) => {
  return {
    ...state,
    ...changes
  };
}