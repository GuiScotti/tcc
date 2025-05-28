<template>
  <div
    class="modal fade"
    :id="'modalDeleteContact' + contact?.id"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-backdrop="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-bolder">Excluir Contato</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            ref="CloseDeleteModal"
            @click.stop
          ></button>
        </div>
        <div
          class="modal-body d-flex flex-column align-items-center justify-content-center"
        >
          <h1 class="fs-4 fw-bolder mt-5 mb-4">
            Tem certeza que deseja excluir este Contato?
          </h1>
          <p class="fs-6">A ação não poderá ser desfeita.</p>

          <button
            type="button"
            class="btn btn-danger w-50 mt-4"
            @click="deleteActualContact"
          >
            Sim
          </button>
          <button
            type="button"
            class="btn btn-light w-50 mt-2 mb-4"
            data-bs-dismiss="modal"
            ref="close"
          >
            Não
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DeleteStageModal",
  props: {
    contact: {
      type: Object,
      required: true,
    },
    funnel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("user", ["showError", "showSuccess"]),
    ...mapActions("contacts", ["destroyContact"]),
    async deleteActualContact() {
      const response = await this.destroyContact({
        funnel_id: this.funnel.id,
        contact_id: this.contact.id,
      });
      
      if (response == 204) {
        this.$emit("deletion");
        this.showSuccess("Contato excluido com sucesso.");
        this.$refs.CloseDeleteModal.click();
      } else {
        this.showError("Erro ao excluir contato.");
      }
    },
  },
};
</script>

<style scoped>
.btn-close {
  font-size: 12px;
}

.modal {
  --bs-modal-width: 55%;
  --bs-modal-padding: 0 !important;
}

.modal-backdrop {
  position: relative;
}
</style>
