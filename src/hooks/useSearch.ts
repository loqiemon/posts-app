import { useState, useEffect } from 'react'

interface useSearchProps<T> {
    array: T[];
    searchProp: keyof T;
}

function useSearch<T>({array, searchProp} : useSearchProps<T>) {
  const [searchedArray, setSearchedArray] = useState<T[]>([]);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (text: string) => {
    setSearchInput(text)
  }

  useEffect(() => {
    setSearchedArray(array)
  }, [array]);

  useEffect(() => {
    if (searchInput.length === 0) {
        setSearchedArray(array)
    }else {
        const filteredArray = array.filter(item => {
            const propValue = item[searchProp] as string;
            return propValue.toLowerCase().includes(searchInput.toLowerCase());
        });
        setSearchedArray(filteredArray);
    }
  }, [searchInput]);

  return ({
    searchedArray,
    handleSearch,
    searchInput
  })
}


export default useSearch
