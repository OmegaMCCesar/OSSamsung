import { useState, useEffect } from 'react';
import { db } from '../configs/firebase';
import { collectionGroup, getDocs, query, where } from 'firebase/firestore';

const useDefectBlocksByCategoryFromModels = (category = '') => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      setLoading(true);
      try {
        const modelosRef = collectionGroup(db, 'modelos');
        const q = query(modelosRef, where('category', '==', category));
        const querySnapshot = await getDocs(q);
        let allBlocks = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.defectBlocks && Array.isArray(data.defectBlocks)) {
            allBlocks = allBlocks.concat(data.defectBlocks);
          }
        });
        // Eliminar duplicados basados en defectBlock
        const uniqueBlocks = [];
        const blockSet = new Set();
        allBlocks.forEach((block) => {
          if (block && block.defectBlock && !blockSet.has(block.defectBlock)) {
            uniqueBlocks.push(block);
            blockSet.add(block.defectBlock);
          }
        });
        setBlocks(uniqueBlocks);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchBlocks();
    } else {
      setBlocks([]);
      setLoading(false);
    }
  }, [category]);

  return { blocks, loading, error };
};

export default useDefectBlocksByCategoryFromModels;


