import React, {PropTypes} from 'react';

const MainLayout = ({children}) => {
  return (
    <div className='main-layout'>
      {children}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element
};

export default MainLayout;
