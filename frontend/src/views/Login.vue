<template>
  <div
    class="d-flex justify-content-center align-items-center flex-column overflow-hidden"
    style="height: 100vh"
  >
  <backEffect />
    <div
      id="main-container"
      class="position-absolute rounded-3 d-flex align-items-center justify-content-center flex-column mb-4"
      style="height: 85%"
    >
      <div id="formArea" class="mx-3 text-center px-4">
        <div id="titleArea">
          <img src="../assets/vencedor/logo.png" alt="logo" class="logo mb-3" />
          <h1 class="h1s">Sua jornada Começa Aqui</h1>
          <p class="fs-6 mb-4">Gestão de notas fiscais de maneira otimizada.</p>
        </div>
        <div class="w-100">
          <InputForm
            class="my-2"
            type="text"
            v-model="email"
            placeholder="Email"
            id="email"
            label="Email"
          />
          <InputForm
            class="my-2"
            type="password"
            v-model="password"
            placeholder="Senha"
            id="password"
            label="Senha"
          />
          <div
            class="linkForm d-flex justify-content-between align-items-center w-100"
          >
            <router-link class="link fs-6" to="/forgot-password">
              Esqueceu sua senha?
            </router-link>
            <router-link class="link fs-6 mx-1" to="/register">
              Crie sua conta
            </router-link>
          </div>
          <button
            type="button"
            class="btn btn-secondary w-100 mb-2 mt-4 rounded-2 cursor-pointer"
            @click="Login"
          >
            Entrar
          </button>
        </div>
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { useToast } from "vue-toastification";
import AppFooter from "../components/AppFooter.vue";
import backEffect from "../components/backEffect.vue";
import InputForm from "../components/InputForm.vue";
import Error from "../components/Error.vue";
import Success from "../components/Success.vue";

export default {
  name: "Login",
  components: {
    AppFooter,
    backEffect,
    InputForm,
    Error,
    Success,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions("user", ["showError", "showSuccess", "login"]),
    async Login() {
      if (!this.email) {
        this.showError("Email inválido.");
        return;
      }
      if (!this.password) {
        this.showError("Senha inválida.");
        return;
      }

      const response = await this.login({
        email: this.email,
        password: this.password,
      });

      if (response == 200) {
        this.showSuccess("Seu Login deu certo.");
        this.$router.push("dashboard");
      } else {
        this.showError(response.data.error.message);
      }
    },
  },
};
</script>

<style scoped>
#main-container {
  width: 40%;
  background-color: #ffffff;
  z-index: 1050 !important;
  box-shadow: 0 4px 18px 0 rgba(34, 54, 77, 0.12);
  color: #677c92;
  padding: 2rem;
}

#titleArea {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.h1s {
  font-weight: 600;
  font-size: 36px;
  font-family: "grotesque", sans-serif;
  color: #212529;
}

.linkForm .link {
  text-decoration: none !important;
  color: inherit;
}

.logo {
  width: 270px;
  height: 110px;
}
</style>