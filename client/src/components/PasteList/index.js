import React from "react";
// import { Link } from "react-router-dom";

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
        <div className="container">
            <div className="col-9 col-md-6 mx-md-auto">

                <div>
                    {pastes &&
                        pastes.map(paste => (
                            <div key={paste.uuid} className="card">
                                <p className="card-header">
                                    {/* <Link
                                        to={`/paste/${paste.uuid}`}
                                        style={{ fontWeight: 700 }}
                                        className="paste-link"
                                    >
                                        Paste #{paste.uuid}
                                    </Link> */}Paste #{paste.uuid}<br/>
                                    Expires on {paste.expires}
                                </p>
                                <div className="card-body">
                                    <textarea className="paste-text" rows="20" readOnly={true} defaultValue={paste.text} />
                                    <button type="edit">Edit</button>{' '}
                                    <button type="delete">Delete</button>
                                </div>
                            </div>
                        ))}
                </div>

            </div>
        </div>
    );
};

export default PasteList;