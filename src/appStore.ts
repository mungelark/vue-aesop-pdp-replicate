import { reactive } from "vue";
import { NSApp } from "./types/appStore";

const appStore: NSApp.Store = {
  state: reactive({
    alertMessageTimeout: 0,
    alertMessage: undefined,
  }),

  setAlertMessage(message) {
    this.state.alertMessage = message;
    clearTimeout(this.state.alertMessageTimeout);
    this.state.alertMessageTimeout = setTimeout(
      () => (this.state.alertMessage = undefined),
      2000
    );
  },
};

export default appStore;
