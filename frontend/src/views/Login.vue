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
      <div id="formArea" class="mb-3">
        <div
          id="logoArea"
          class="w-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
          style="margin-bottom: 15px"
        >
          <div
            id="logo3c"
            class="d-flex align-items-center justify-content-center position-absolute w-100 h-100"
          >
            <img id="three" src="../assets/vencedor/3da3c.png" alt="three" />
            <img id="LetterC" src="../assets/vencedor/cDa3c.png" alt="c" />
            <img id="plus" src="../assets/vencedor/PlusDa3c.png" alt="plus" />
          </div>
          <div id="pics3c">
            <img id="plusIcon" src="../assets/vencedor/plus3c.png" alt="plus" />
            <img
              id="messageIcon"
              src="../assets/vencedor/message3c.png"
              alt="message"
            />
            <img
              id="asterisc"
              src="../assets/vencedor/asterisc3c.png"
              alt="asterisc"
            />
          </div>
        </div>
        <div id="titleArea">
          <h1 class="h1s mt-3">Sua jornada Começa Aqui</h1>
          <p class="fs-6 mb-4">Um único login para todos os produtos da 3c plus</p>
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
            <router-link class="link fs-6" to="/forgot-password"
              >Esqueceu sua senha?</router-link
            >
            <router-link class="link fs-6 mx-1" to="/register"
              >Crie sua conta</router-link
            >
          </div>
          <button
            type="button"
            class="btn btn-primary w-100 mb-2 mt-4 rounded-2 cursor-pointer"
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
    ...mapActions("user", ["showError", "showSuccess"]),
    ...mapActions("user", ["login"]),
    async Login() {
      // error treatment

      if (!this.email) {
        this.showError("Email inválido.");
        return;
      }
      if (!this.password) {
        this.showError("Senha inválida.");
        return;
      }

      // method to login
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
/* FORM STYLE */
#main-container {
  width: 40%;
  background-color: #ffffff;
  z-index: 1050 !important;
  box-shadow: 0 4px 18px 0 rgba(34, 54, 77, 0.12);
  color: #677c92;
}

/* FORM STYLE */

/* TITLE STYLE */

#titleArea {
  display: flex;
  flex-direction: column;
  justify-content: center !important;
  align-items: center;
}

.h1s {
  font-weight: 100;
  font-size: 38px;
  font-family: "grotesque";
  color: #212529;
}

/* STYLE FROM THE FORM */

.linkForm .link {
  text-decoration: none !important;
  color: inherit;
}

/* LOGO ANIMATION */

#logoArea {
  height: 65px;
}

#logo3c,
#pics3c {
  top: 0;
}

@keyframes moveUp {
  0%,
  5% {
    transform: translateY(100%);
    visibility: hidden;
  }
  10%,
  45% {
    transform: translateY(0);
    visibility: visible;
  }
  50%,
  95% {
    transform: translateY(-100%);
    visibility: hidden;
  }
  100% {
    transform: translateY(100%);
    visibility: hidden;
  }
}

@keyframes moveUpDelayed {
  0%,
  55% {
    transform: translateY(100%);
    visibility: hidden;
  }
  60%,
  95% {
    transform: translateY(0);
    visibility: visible;
  }
  100% {
    transform: translateY(-100%);
    visibility: hidden;
  }
}

#logo3c {
  animation: moveUp 15s ease-in-out infinite;
}

#pics3c {
  animation: moveUpDelayed 15s ease-in-out infinite;
}

#logo3c #three {
  width: 45px;
  height: 65px;
}

#logo3c #LetterC {
  width: 55px;
  height: 65px;
}

#logo3c #plus {
  width: 25px;
  height: 25px;
  margin-left: -5px;
}

#pics3c #plusIcon,
#pics3c #messageIcon,
#pics3c #asterisc {
  width: 65px;
  height: 65px;
  margin: 0 10px;
}
</style>
