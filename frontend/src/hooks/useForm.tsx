import { useState } from "react";


export function useForm() {
  const [inputValues, setInputValues] = useState( { username: "", password: "" });

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setInputValues((prevState) => ({...prevState, [name]: value }))
  }

  return {inputValues, handleInputs}
}