import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function setupNotifications() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Потрібен дозвіл на сповіщення!');
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('reminders', {
      name: 'Нагадування про Записи',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return true;
}

export async function scheduleDateNotification(
  title: string,
  body: string,
  triggerDate: Date,
  data?: any
) {
  const isSetupOk = await setupNotifications();
  if (!isSetupOk) return;

  if (triggerDate.getTime() <= Date.now()) {
    console.warn('Не можна запланувати сповіщення у минулому. Пропускаємо.',triggerDate.getTime());
    return;
  }
  
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      sound: 'default',
      data: data,
    },
    trigger: {
      type: 'date', 
      date: triggerDate,
      channelId: 'reminders',
    },
  });

  console.log(`Сповіщення заплановано з ID: ${notificationId} на ${triggerDate.toLocaleString()}`);
  return notificationId;
}
