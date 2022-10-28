import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { Link } from "react-router-dom";
import { CREATE_PASTE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const PasteForm = () => {

    const [formState, setFormState] = useState({ text: '' });
    const [createPaste, { error }] = useMutation(CREATE_PASTE, {
        update(cache, { data: { createPaste } }) {
            
            try {
                const { me } = cache.readQuery({ query: QUERY_ME });

                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, pastes: [...me.pastes, createPaste] } }
                });
            } catch (e) {
                console.warn("First paste insertion by user!")
            }
        }
    });

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