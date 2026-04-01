class PushNotificationService {
  async requestUserPermission() {
    return false;
  }

  async getFcmToken() {
    return null;
  }

  async subscribeToTopic(_topicName: string) {}

  initializeListeners() {
    return () => {};
  }

  async deleteToken() {}
}

export default new PushNotificationService();
