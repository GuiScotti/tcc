export default {
    addStage(state, stage) {
        state.stages.push(stage);
    },
    setStages(state, stages) {
        state.stages = stages;
    },
    deleteStage(state, stage_id) {
        state.stages = state.stages.filter(s => s.id !== stage_id);
    },
    clearStages(state) {
        state.stages = [];
    },
}