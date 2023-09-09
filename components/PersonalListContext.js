import React, { createContext, useContext, useState } from 'react';

const PersonalListContext = createContext();

export const usePersonalListContext = () => useContext(PersonalListContext);

export const PersonalListProvider = ({ children }) => {
  const [personalList, setPersonalList] = useState([]);

  return (
    <PersonalListContext.Provider value={{ personalList, setPersonalList }}>
      {children}
    </PersonalListContext.Provider>
  );
};