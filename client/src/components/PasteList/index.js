import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const PasteList = ({ pastes }) => {
      const [theme, setTheme] = useState('paste-text-dark');
  const toggleTheme = () => {
    if (theme === 'paste-text-dark') {
      setTheme('past-text');
    } else {
      setTheme('paste-text-dark');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

    if (!pastes.length) {
        return    <div className="card">
                        
                        <div className="container">
                            <h4><b>No Pastes</b></h4>
                            <p>Yet...</p>
                        </div>
                    </div>

    }

    return (
            

                <div className="row justify-content-center">
                     
                    {pastes &&
                        pastes.map(paste => (
                            
                            <div key={paste.uuid}  className="col-8 my-5 mx-5">
                                <p >
                                    Paste{' '}
                                    <Link
                                        to={`/paste/${paste.uuid}`}
                                        style={{ fontWeight: 700 }}
                                        
                                    >#{paste.uuid}</Link><br/>
                                    Expires on {paste.expires}
                                </p>
                                <div className=" row justify-content-center ">
                                    <textarea className={`${theme} col-12`} rows="20" readOnly={true} defaultValue={paste.text} />
                                    <Link to={`/update-paste/${paste.uuid}`}>
                                    <button className={`col-12 paste-button`} type="edit">Edit</button></Link>{' '}
                                    <button className=" mt-5 col-12 paste-button-delete" type="delete">Delete</button>
                                </div>
                            </div>
                        ))}
                        
                </div>

            
    );
};
//   <div key={paste.uuid} className="card">
//             <p className="card-header">
//                 Paste #{paste.uuid}<br/>
//                 Expires on {paste.expires}
//             </p>
//             <div className="card-body">
//                 <textarea className="paste-text" rows="20" readOnly={true} defaultValue={paste.text} />
//             </div>
//         </div>



export default PasteList;