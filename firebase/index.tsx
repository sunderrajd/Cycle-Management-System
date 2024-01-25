import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyD_cdT20K97cikMbSJNoyG1UwnUn_ADf8o",
  authDomain: "cyclerent-7459b.firebaseapp.com",
  projectId: "cyclerent-7459b",
  storageBucket: "cyclerent-7459b.appspot.com",
  messagingSenderId: "231300466605",
  appId: "1:231300466605:web:b27cf5e7586ef496090324",
  measurementId: "G-4LZ6GB6GFN"
}

export const app = initializeApp(firebaseConfig)
