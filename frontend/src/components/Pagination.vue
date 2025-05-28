<template>
  <div class="pagination-container">
    <button
      class="btn btn-light mx-2"
      @click="previous"
      :disabled="!getPagination.prev_page_url"
    >
      Voltar
    </button>
    <button
      class="btn btn-light mx-2"
      @click="next"
      :disabled="!getPagination.next_page_url"
    >
      Próximo
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    page: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    ...mapGetters("funnels", ["getPagination"]),
  },
  methods: {
    ...mapActions("user", ["showError"]),
    ...mapActions("funnels", ["setFunnels"]),
    next() {
      if (this.getPagination.next_page_url) {
        this.$emit("paginate", this.page + 1);
      }
    },
    previous() {
      if (this.getPagination.prev_page_url) {
        this.$emit("paginate", this.page - 1);
      }
    },
  },
};
</script>

<style scoped>
.pagination-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #fff;
}
</style>