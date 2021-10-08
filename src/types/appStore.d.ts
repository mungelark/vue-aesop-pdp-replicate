export namespace NSApp {
  export interface AlertMessage {
    message: string;
  }

  export interface Store {
    state: {
      alertMessage: AlertMessage | undefined;
      alertMessageTimeout: number;
    };

    setAlertMessage(message: AlertMessage | undefined): void;
  }
}
