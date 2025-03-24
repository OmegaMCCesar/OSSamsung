// src/hooks/useDefectBlocksByCategory.js
import { useState, useEffect } from 'react';
import { db } from '../configs/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const useDefectBlocksByCategory = (category = '') => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      setLoading(true);
      try {
        const blocksRef = collection(db, 'defectBlocks');
        let q = query(blocksRef);
        if (category) {
          q = query(blocksRef, where('category', '==', category));
        }
        const querySnapshot = await getDocs(q);
        const blocksData = [];
        querySnapshot.forEach((doc) => {
          blocksData.push({ id: doc.id, ...doc.data() });
        });
        setBlocks(blocksData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, [category]);

  return { blocks, loading, error };
};

export default useDefectBlocksByCategory;
