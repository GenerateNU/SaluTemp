// UserContext.ts
import React, { createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface UserContextProps {
  userId: string | null;
  updateUser: Dispatch<SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = React.useState<string | null>(null);

  const updateUser = (newUserId: string | null) => {
    setUserId(newUserId);
  };

  return (
    <UserContext.Provider value={{ userId, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
