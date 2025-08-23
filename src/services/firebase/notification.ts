import { toast } from "sonner";
import { messaging } from "./firebaseConfig";
import { getToken , onMessage } from "firebase/messaging";
import { getErrorMessage } from "@/utils/errors/errorHandler";

const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;


export const requestNotificationPermission = async (): Promise<string | null> => {
  try {
   if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.warn("Push not supported");
          return null;
      }
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        const swRegistration = await navigator.serviceWorker.ready; 
    console.log("✅ Service Worker ready:", registration);
  
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      toast.error("Notification permission not granted.");
      return null;
    }

    const currentToken = await getToken(messaging, {
      vapidKey, 
      serviceWorkerRegistration: swRegistration,
    });

    if (currentToken) {
      console.log("✅ FCM token:", currentToken);
      return currentToken;
    } else {
      console.warn("⚠️ No registration token available.");
      toast.error("No registration token available.");
      return null;
    }
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    console.error("🚨 Error getting FCM token:", error);
    console.error("🚨 Error details:", message);
    return null;
  }
};


export const listenToForegroundMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("📩 Foreground message received:", payload);
    toast.success(payload.notification?.title + " - " + payload.notification?.body);
  }); 
};