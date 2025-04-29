import { Global, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

@Global()
@Module({
    providers: [
        {
            provide: 'FIREBASE_ADMIN',
            useFactory: () => {
                const serviceAccount: ServiceAccount = {
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
                };

                if (!admin.apps.length) {
                    return admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
                }

                return admin.app();
            },
        },
    ],
    exports: ['FIREBASE_ADMIN']
})
export class FirebaseModule { }
