import {useState, useEffect } from 'react';

interface useSortProps<T> {
    array: T[];
}

function useSort<T>({array} : useSortProps<T>) {
  const [sortProp, setSortProp] = useState<keyof T | undefined>(undefined);
  const [sortType, setSortType] = useState(false);
  const [sortedArray, setSortedArray] = useState<T[]>([]);

  useEffect(() => {
    setSortedArray(array)
  }, [array]);

  useEffect(() => {
    if (sortProp !== undefined) {
        setSortedArray(dynamicSort<T>(sortedArray, sortProp, sortType))
    }else {
        setSortedArray(array);
    }
  }, [sortProp, sortType]);
  
  const handleSort = (sortProp: keyof T): void => {
    setSortProp(sortProp);
    setSortType(prev => !prev);
  }

  return ({
    handleSort,
    sortedArray
  })
}

export default useSort


function dynamicSort<T>(array: T[], property: keyof T, sortType: boolean): T[] {
    const sorted = [...array];
    
    return sorted.sort((a, b) => {
        const aValue = a[property];
        const bValue = b[property];
        
        if (aValue === bValue) {
            return 0;
        }
        
        if (sortType) {
            return aValue < bValue ? -1 : 1;
        } else {
            return aValue > bValue ? -1 : 1;
        }
    });
}
