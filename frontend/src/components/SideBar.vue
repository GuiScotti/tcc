<template>
  <div
    ref="sidebar"
    id="sidebar"
    class="d-flex flex-column position-fixed"
    @mouseover="expand"
    @mouseout="collapse"
  >
    <div id="img" class="d-flex">
      <img src="../assets/vencedor/logo-3C.svg" class="py-3" alt="logo" />
    </div>
    <router-link
      to="/dashboard"
      class="my-4 mx-2 text-decoration-none"
    >
      <font-awesome-icon class="icon" :icon="['fas', 'chart-line']" /><span class="icon-text"> Dashboard</span>
    </router-link>
    <router-link
      :to="crmLink"
      class="my-2 mx-2 text-decoration-none"
    >
      <font-awesome-icon class="icon" :icon="['fas', 'chart-bar']" /><span class="icon-text"> CRM</span>
    </router-link>
    <p class="icon-profile mt-auto mx-2" @click="loggingOut">
      <font-awesome-icon class="icon" :icon="['fas', 'arrow-right-from-bracket']" /><span class="icon-text"> Sair</span>
    </p>
    <!-- @click="loggingOut" -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SideBar",
  data() {
    return {
      sideBarExpanded: false,
    };
  },
  computed: {
    ...mapGetters("funnels", ["getLastFunnel"]),
    crmLink() {
      if (!this.getLastFunnel) {
        return {
          path: "/dashboard",
          query: { error: "Entre em um funil primeiro!" },
        };
      } else {
        const encodedColor = encodeURIComponent(this.getLastFunnel.color);
        return `/funnel/${this.getLastFunnel.name}/${this.getLastFunnel.id}/${encodedColor}`
      }
    },
  },
  watch: {
    "$route.query.error"(newVal) {
      if (newVal) {
        this.showError(newVal);
      }
    },
  },
  methods: {
    ...mapActions("user", ["logout", "showError", "showSuccess"]),
    ...mapActions("funnels", ["clearFunnels"]),
    expand() {
      this.sideBarExpanded = true;
      this.$refs.sidebar.style.width = "200px";
      this.$emit("toggleSideBar", true);
    },
    collapse() {
      this.sideBarExpanded = false;
      this.$refs.sidebar.style.width = "75px";
      this.$emit("toggleSideBar", false);
    },
    async loggingOut() {
      try {
        await this.logout();
        this.$router.push({ name: "login" });
        this.showSuccess("Deslogado com sucesso.");
      } catch (error) {
        this.showError("Erro ao deslogar.");
      }
    },
  },
};
</script>

<style lang="scss">
#img {
  justify-content: center;
  align-items: center;
  background-color: #ffbb3a;
  height: 75px;
  img {
    width: 75%;
    height: 75px;
  }
}

a {
  color: #677c92
}

.icon {
  margin-right: 28px;
  margin-left: 20px;
}

.icon-text:hover,
.icon-profile:hover,
.icon:hover {
  cursor: pointer;
  color: rgb(48, 87, 242);
}

.icon-text {
  margin-bottom: 10px;
}

.icon {
  font-size: 20px;
}

#sidebar {
  color: #677c92;
  height: 100%;
  width: 75px;
  transition: 0.5s;
  overflow-x: hidden;
  white-space: nowrap;
  position: fixed;
  z-index: 1000;
  box-shadow: -10px 0 30px -2px rgba(0, 0, 0, 0.5);
}

.icon-profile {
  margin-top: auto;
}
</style>
