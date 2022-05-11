import PushNotification from 'react-native-push-notification'
import { AppState, Platform } from 'react-native'
PushNotification.configure({
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
    },
    onRegistrationError: function (err) {
        console.error(err.message, err);
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
    // requestPermissions: true,
});

export const LocalNotification = () => {

    PushNotification.localNotificationSchedule({
        channelId: 'your-channel-id',
        autoCancel: true,
        title: "Booking Request", // (optional)
        message: "Your Have a Pending Request ", // (required)
        vibrate: true,
        vibration: 300,
        color: "green",
        playSound: true,
        soundName: 'default',
        invokeApp: true,
        date: new Date(Date.now() + 5 * 1000)
    })
}