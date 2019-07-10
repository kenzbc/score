export const state = () => ({
  text: ''
});

export const mutations = {
  add (state, text) {
    state.text = text;
  },
  remove (state, { todo }) {
    state.text = '';
  }
};
