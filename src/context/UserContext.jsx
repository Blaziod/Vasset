/* eslint-disable react/prop-types */
import React from "react";

const UserContext = React.createContext({
  userInfo: null,
  setUserInfo: () => {},
});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = React.useState(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
