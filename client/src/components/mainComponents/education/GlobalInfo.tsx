import React from 'react';
import { Outlet } from 'react-router-dom';

const GlobalInfo = () => {
   return (
      <>
         <div>information globale</div>
         <Outlet />
      </>
   );
};

export default GlobalInfo;
