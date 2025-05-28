<template>
  <div
    class="card d-flex flex-column justify-content-between border-1 rounded-3 p-2 m-1"
    style="width: 96%; height: 80px"
  >
    <div class="d-flex justify-content-between">
      <p class="" style="font-size: 13px; font-weight: 600">
        {{ contact.name }}
      </p>
      <font-awesome-icon
        class="pen position-absolute mx-1"
        data-bs-toggle="offcanvas"
        :data-bs-target="'#offcanvasRight' + contact.id + funnel.id"
        aria-controls="offcanvasRight"
        :icon="['far', 'pen-to-square']"
      />
    </div>
    <p style="font-size: 10px; margin-bottom: 0 !important">
      {{ contact.buyValue }}
    </p>
    <OffCanvasUpdateContact
        @updateTheContacts="updateContacts"
        :contact="contact"
        :funnel="funnel"
        :stage="stage"
      />
  </div>
</template>

<script>
import OffCanvasUpdateContact from "./OffCanvasUpdateContact.vue";

export default {
  name: "CardContact",
  components: {
    OffCanvasUpdateContact,
  },
  props: {
    contact: {
      type: Object,
      required: true,
    },
    funnel: {
      type: Object,
      required: true,
    },
    stage: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateContacts() {
      this.$emit("updateContacts");
    }
  },
};
</script>

<style>
.card {
  position: relative;
  display: inline-block;
}

.pen {
  display: none;
  right: 0;
  cursor: pointer;
  font-size: 13px;
}

.card:hover .pen {
  display: block;
}
</style>
