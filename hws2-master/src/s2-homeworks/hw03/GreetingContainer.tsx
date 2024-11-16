import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import Greeting from "./Greeting";
import { UserType } from "./HW3";

type GreetingContainerPropsType = {
  users: UserType[];
  addUserCallback: (name: string) => void;
};

export const pureAddUser = (
  name: string,
  setError: (error: string) => void,
  setName: (name: string) => void,
  addUserCallback: (name: string) => void
) => {
  if (name.trim() === "") {
    return setError("Ошибка! Введите имя!");
  } else {
    addUserCallback(name);
    setName("");
  }
};

export const pureOnBlur = (name: string, setError: (error: string) => void) => {
  if (name.trim() === "") return setError("Ошибка! Введите имя!"); // если имя пустое - показать ошибку
};

export const pureOnEnter = (
  e: KeyboardEvent<HTMLInputElement>,
  addUser: () => void
) => {
  if (e.key === "Enter") return addUser();
};

const GreetingContainer = ({
  users,
  addUserCallback,
}: GreetingContainerPropsType) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
    if (e.currentTarget.value.trim() === "") {
      setError("Ошибка! Введите имя!");
    } else setError(null);
  };
  const addUser = () => {
    pureAddUser(name, setError, setName, addUserCallback);
  };

  const onBlur = () => {
    pureOnBlur(name, setError);
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") return addUser();
  };

  const totalUsers = users.length;
  const lastUserName = users.length > 0 ? users[users.length - 1].name : "";

  return (
    <Greeting
      name={name}
      setNameCallback={setNameCallback}
      addUser={addUser}
      onBlur={onBlur}
      onEnter={onEnter}
      error={error}
      totalUsers={totalUsers}
      lastUserName={lastUserName}
    />
  );
};

export default GreetingContainer;