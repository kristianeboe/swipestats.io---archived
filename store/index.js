export const state = () => ({
  counter: 0,
  swipeStats: {},
});

export const mutations = {
  setSwipeStats(state, swipeStats) {
    state.swipeStats = swipeStats;
  },
};
