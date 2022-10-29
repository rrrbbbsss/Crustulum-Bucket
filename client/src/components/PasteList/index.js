import React from "react";
import { Link } from "react-router-dom";

const PasteList = ({ pastes }) => {
    if (!pastes.length) {
        return    <div className="card">
                        
                        <div className="container">
                            <h4><b>No Pastes</b></h4>
                            <p>Yet...</p>
                        </div>
                    </div>

    }

    return (
            

                <div className="row justify-content-center mt-5 ">
                    {pastes &&
                        pastes.map(paste => (
                            <div key={paste.uuid}  className=" col-12">
                                <p className="single-paste col-12">
                                    Paste{' '}
                                    <Link
                                        to={`/paste/${paste.uuid}`}
                                        style={{ fontWeight: 700 }}
                                        
                                    >#{paste.uuid}</Link><br/>
                                    Expires on {paste.expires}
                                </p>
                                <div className=" ">
                                    <textarea className="paste-text col-12 col-md-8" rows="20" readOnly={true} defaultValue={paste.text} />
                                    <Link to={`/update-paste/${paste.uuid}`}>
                                    <button className=" col-12 col-md-8 paste-button" type="edit">Edit</button></Link>{' '}
                                    <button className="col-12 col-md-8  paste-button-delete" type="delete">Delete</button>
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