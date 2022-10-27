import React from "react";
// import { Link } from "react-router-dom";

const PasteList = ({ pastes }) => {
    if (!pastes.length) {
        return <h3>No pastes found.</h3>
    }

    return (
        <div className="container">
            <div className="flex-row">
                <div className="col-3"></div>
                <div className="col-6">
                    {pastes &&
                        pastes.map(paste => (
                            <div key={paste.uuid} className="card mb-3">
                                <p className="card-header">
                                    {/* <Link
                                        to={`/paste/${paste.uuid}`}
                                        style={{ fontWeight: 700 }}
                                        className="paste-link"
                                    >
                                        Paste #{paste.uuid}
                                    </Link> */}Paste #{paste.uuid}
                                </p>
                                <div className="card-body">
                                    <textarea className="paste-text" rows="20" readOnly={true} defaultValue={paste.text} />
                                    <button type="edit">Edit</button>{' '}
                                    <button type="delete">Delete</button>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    );
};

export default PasteList;