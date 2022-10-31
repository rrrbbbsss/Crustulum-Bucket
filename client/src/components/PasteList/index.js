import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_PASTE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const PasteList = ({ pastes }) => {
    const navigate = useNavigate();
    const [deletePaste, { error }] = useMutation(DELETE_PASTE, {
        update(cache, { data: { deletePaste } }) {
            
            try {
                const { me } = cache.readQuery({ query: QUERY_ME });

                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, pastes: [...me.pastes, deletePaste] } }
                });
            } catch (e) {
                console.error(e);
            }
        }
    }); 

    if (!pastes.length) {
        return    <div className="card">
                        
                        <div className="container">
                            <h4><b>No Pastes</b></h4>
                            <p>Yet...</p>
                        </div>
                    </div>

    }

    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            await deletePaste({
                variables: { input: { uuid: event.target.value }}
            });

            navigate('/');
            
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="container">
            <div className="col-9 col-md-6 mx-md-auto">

                <div>
                    {pastes &&
                        pastes.map(paste => (
                            <div key={paste.uuid} className="card">
                                <p className="card-header">
                                    Paste{' '}
                                    <Link
                                        to={`/paste/${paste.uuid}`}
                                        style={{ fontWeight: 700 }}
                                        className="paste-link"
                                    >#{paste.uuid}</Link><br/>
                                    Expires on {paste.expires}
                                </p>
                                <div className="card-body">
                                    <textarea className="paste-text" readOnly={true} rows="20" defaultValue={paste.text} />
                                    <Link to={`/update-paste/${paste.uuid}`}>
                                    <button type="edit">Edit</button></Link>{' '}
                                    <button value={paste.uuid} type="delete" onClick={handleDelete}>Delete</button>
                                    {error && <div>Delete Failed!</div>}
                                </div>
                            </div>
                        ))}
                </div>

            </div>
        </div>
    );
};

export default PasteList;