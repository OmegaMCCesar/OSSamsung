import { db } from '../configs/firebase';
import {
    doc, setDoc,
     collection, query, orderBy, limit, getDocs
} from 'firebase/firestore';

const createUserProfile = async (uid, data) => {
    await setDoc(doc(db, 'users', uid),{
        ...data,
        xp:0,
        level: 1,
        lives: 5,
        lastLifeRefill: 'free',
        createAt: new Date(),
    });
}

/* const addXp = async (uid, xp) => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { xp: increment(amount)}); */


const  fetchLeaderboard = async (limitCount = 100) => {
    const q = query(
        collection(db, 'users'),
        orderBy('xp', 'desc'),
        limit(limitCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ uid: d.id, ...d.data()}));
}

/* const refillLives = async (uid) => {

}

const spendLifeOnWrong = async (uid) => {
    // lógica de gasto
  }
const buyLives =  async (uid, costTurquitas) => {
    // lógica de compra
} */

export {
    createUserProfile,
   /*  addXp, */
    fetchLeaderboard,
    // refillLives,
    // spendLifeOnWrong,
    // buyLives
}