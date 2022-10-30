import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
// import { Link } from "react-router-dom";
import { CREATE_PASTE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const PasteForm = () => {
  
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
        <main className="container bg-none">
            <div className="flex-row">
                <div>
                    
                        <form onSubmit={handleFormSubmit}>
                             <div className="mb-3 my-5 col-12 col-md-8">
                                </div>
                                <div className="mb-3">
                                <label class={`${theme} new-paste-header`}>New Paste</label>
                                <textarea className={` ${theme} new-paste`} name="text" id="pasteText"  value={formState.text}
                                onChange={handleChange}
                                rows='20' />
                                </div>
                            <button className="col-12 col-md-12 paste-button-delete2"type="submit">Paste</button>
                            {error && <div>Paste Failed!</div>} 
                        </form>
                    
                </div>
            </div>
        </main>
    );
};

export default PasteForm;