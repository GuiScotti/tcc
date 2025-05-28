<template>
  <div id="app-container">
    <SideBar @toggleSideBar="toggleSideBar" />
    <navBar ref="NavBar" :expanded="expanded" @createFunnel="createFunnel" />
    <div id="main-content" class="p-4 d-flex flex-row align-items-center" ref="MainContent">
      <Metrics />
      <div class="main w-100 d-flex flex-row">
        <CardFunnel
          v-for="funnel in getFunnels"
          :funnel="funnel"
          :key="funnel.id"
          @deleteFunnel="funnelDelection"
          @goToFunnel="goToFunnel"
        />
      </div>
    </div>
    <Pagination @paginate="paginate" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SideBar from "@/components/SideBar.vue";
import NavBar from "@/components/navBar.vue";
import CardFunnel from "@/components/CardFunnel.vue";
import Pagination from "@/components/Pagination.vue";
import Metrics from "@/components/Metrics.vue";

export default {
  data() {
    return {
      CurPage: 1,
      expanded: false,
    };
  },
  computed: {
    ...mapGetters("user", ["isAuth"]),
    ...mapGetters("funnels", ["getFunnels", "refresh"]),
  },
  async created() {
    await this.setFunnels(this.CurPage);
  },
  components: {
    SideBar,
    NavBar,
    CardFunnel,
    Pagination,
    Metrics,
  },
  methods: {
    ...mapActions("user", ["logout", "showError", "showSuccess"]),
    ...mapActions("funnels", [
      "saveFunnel",
      "setFunnels",
      "deleteFunnel",
      "setLastFunnel",
    ]),
    async paginate(page) {
      this.CurPage = page;
      await this.setFunnels(page);
    },
    goToFunnel(funnel) {
      this.$router.push({ name: "Funil", params: funnel });
      this.setLastFunnel(funnel);
    },
    async createFunnel(funnel) {
      const response = await this.saveFunnel(funnel);
      if (response.status == 201) {
        this.showSuccess("Funil criado com sucesso!");
      } else {
        this.showError(response[0]);
      }
    },
    async funnelDelection(funnel) {
      try {
        await this.deleteFunnel(funnel);
        this.showSuccess("Funil deletado com sucesso.");
      } catch (error) {
        this.showError(error.message);
      }
    },
    toggleSideBar(expanded) {
      if (expanded) {
        this.$refs.MainContent.style.marginLeft = "200px";
        this.$refs.NavBar.$el.style.marginLeft = "200px";
      } else {
        this.$refs.MainContent.style.marginLeft = "75px";
        this.$refs.NavBar.$el.style.marginLeft = "75px";
      }
    },
  },
};
</script>

<style scoped lang="scss">
#app-container {
  display: flex;
  height: 100vh;
  flex-direction: column;
  color: #212529;
}

.main {
  overflow: hidden;
  flex-wrap: wrap;
  margin-left: 20px;
}

#main-content {
  margin-left: 75px;
  transition: margin-left 0.5s;
  overflow: hidden;
  flex-wrap: wrap;
}


</style>
