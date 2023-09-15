import { useState } from 'react'


function useInput() {
    const [input, setInput] = useState('');

    const handleInput = (text: string): void => {
        setInput(text);
    }

  return ({
    input,
    handleInput
  })
}

export default useInput
