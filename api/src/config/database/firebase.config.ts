import admin, { ServiceAccount } from "firebase-admin";
import * as fireorm from "fireorm";
import serviceAccount from "../database/database-project-2b1a3-firebase-adminsdk-fbsvc-221d66546e.json";

// Cấu hình firebase database
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

const dbConfig = admin.firestore();
fireorm.initialize(dbConfig);

export { dbConfig };
