import React from 'react';
import { useLocation } from 'react-router-dom';
import RightSideContainer from "../RightSideContainer/RightSideContainer";

function ShowRightSideContainer() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return !isLoginPage && <RightSideContainer />;
}

export default ShowRightSideContainer;
