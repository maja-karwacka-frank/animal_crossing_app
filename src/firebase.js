import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyAmug7cp04CrxVp8UoFia5EfV4NQ4bEMSs',
	authDomain: 'animal-crossing-213c2.firebaseapp.com',
	projectId: 'animal-crossing-213c2',
	storageBucket: 'animal-crossing-213c2.appspot.com',
	messagingSenderId: '19094177346',
	appId: '1:19094177346:web:28efb5a4e3b1e34b2f0fdb',
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDb = getFirestore(app);
