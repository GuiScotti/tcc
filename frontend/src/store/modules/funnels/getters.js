export default {
    getFunnels(state){
        return state.funnels;
    },
    isLoading(state){
        return state.loading;
    },
    getPagination(state){
        return state.pagination;
    },
    getLastFunnel(state){
        return state.lastFunnel;
    },
    getMetrics(state){
        return state.metrics;
    }
}