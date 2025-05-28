import {
  createContact,
  destroyContact,
  getContacts,
  swap,
  swapBetweenPhases,
  updateContact,
} from "@/services/HttpService";

export default {
  async swapBetweenPhases({ rootState }, { funnel_id, contact_id, changes }) {
    try {
      const token = rootState.user.token;
      await swapBetweenPhases(funnel_id, contact_id, changes, token);
    } catch (error) {
      console.log(error);
    }
  },
  async swap({ rootState }, { funnel_id, contact_id, stage_id, changes }) {
    try {
      const token = rootState.user.token;
      await swap(funnel_id, contact_id, stage_id, changes, token);
      console.log(changes);
    } catch (error) {
      console.log(error);
    }
  },
  async setContacts({ commit, rootState }, funnel_id) {
    try {
      const token = rootState.user.token;
      const response = await getContacts(funnel_id, token);
      commit("setContacts", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async createContact({ commit, rootState }, { funnel_id, contact }) {
    try {
      const token = rootState.user.token;
      const response = await createContact(funnel_id, contact, token);
      commit("addContact", response.data.contact);
      return response.status;
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
  async updateTheContact(
    { commit, rootState },
    { funnel_id, contact_id, contact }
  ) {
    try {
      const token = rootState.user.token;
      const response = await updateContact(
        funnel_id,
        contact_id,
        contact,
        token
      );
      commit("editContact", { contact: contact, id: contact_id });
      return response.status;
    } catch (error) {
      console.log(error);
    }
  },
  async destroyContact({ commit, rootState }, { contact_id, funnel_id }) {
    try {
      const token = rootState.user.token;
      const response = await destroyContact(funnel_id, contact_id, token);
      commit("deleteContact", contact_id);
      console.log(response);
      return response.status;
    } catch (error) {
      console.log(error);
    }
  },
};
