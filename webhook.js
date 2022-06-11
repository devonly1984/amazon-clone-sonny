import { buffer } from "micro"
import * as admin from 'firebase-admin';
//secure a connection to firebase from backend
const serviceAccount = require('../../../permissions.json');
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();
//establish connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export default async (req, res) => {
    if (req.method === 'POST') {

    }
}