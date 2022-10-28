import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { READ_PASTE } from "../utils/queries";
// import auth from "../utils/auth";
import Header from "../components/Header";

const SinglePaste = () => {
    // const loggedIn = auth.loggedIn();

    const { id: pasteId } = useParams();

    const { loading, data } = useQuery(READ_PASTE, {
        variables: { input: { uuid: pasteId } }
    });

    const paste = data?.readPaste || {};

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
        <Header />
        <div key={paste.uuid} className="card">
            <p className="card-header">
                Paste #{paste.uuid}<br/>
                Expires on {paste.expires}
            </p>
            <div className="card-body">
                <textarea className="paste-text" rows="20" readOnly={true} defaultValue={paste.text} />
            </div>
        </div>
        </>
    );
};

export default SinglePaste;