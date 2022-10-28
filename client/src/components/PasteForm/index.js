import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { RefetchQueriesInclude } from "@apollo/client";
import { CREATE_PASTE } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";
import { QUERY_ME } from "../../utils/queries";

const PasteForm = () => {

    const [formState, setFormState] = useState({ text: '' });
    const [createPaste, { error }] = useMutation(CREATE_PASTE);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('submitted');
        
        try {
            await createPaste({
                variables: { input: { ...formState } }
        });
        
        setFormState('');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className="container mb-4">
            <div className="flex-row">
                <div className="card col-6">
                    <h4 className="card-header">Paste:</h4>
                    <div className="card-body">
                        <form onSubmit={handleFormSubmit}>
                            <textarea
                                name="text" 
                                type="text"
                                id="pasteText"
                                value={formState.text}
                                onChange={handleChange}
                                rows='20' />
                            <button type="submit">Paste</button>
                            {error && <div>Paste Failed!</div>}
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PasteForm;