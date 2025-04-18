import { db } from '../configs/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const fetchModule = async () => {
    const snap = await getDocs(collection(db, 'modules'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => a.order - b.order);
}

const fetchLessons = async (moduleId) => {
    const snap = await getDocs(collection(db, `modules/${moduleId}/lessons`));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

const fetchLesson = async (moduleId, lessonId) => {
    const snap = await getDoc(doc(db, `modules/${moduleId}/lessons/${lessonId}`));
    return { id: snap.id, ...snap.data() };
}

export {
    fetchModule,
    fetchLessons,
    fetchLesson
}