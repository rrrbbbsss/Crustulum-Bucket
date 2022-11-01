import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { UPDATE_PASTE } from "../utils/mutations";
import { QUERY_ME, READ_PASTE } from "../utils/queries";
import Header from "../components/Header";

const UpdatePaste = () => {
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
  

    const { id: pasteId } = useParams();

    const { loading, data } = useQuery(READ_PASTE, {
        variables: { input: { uuid: pasteId } }
    });

    const paste = data?.readPaste || {};

    const uuid = paste.uuid;


    console.log(paste);

    const [formState, setFormState] = useState({ text: paste.text });
    const [updatePaste, { error }] = useMutation(UPDATE_PASTE, {
        update(cache, { data: { updatePaste } }) {
            
            try {
                const { me } = cache.readQuery({ query: QUERY_ME });

                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, pastes: [...me.pastes, updatePaste] } }
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
            await updatePaste({
                variables: { input: { ...formState, uuid } }
        });
        
        } catch (e) {
            console.error(e);
        }
    };

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
        <Header />
        <div key={paste.uuid} className=" row justify-content-center ">
            <p className="error2">
                Paste #{paste.uuid}<br/>
                Expires on {paste.expires}
            </p>
            <div className=" row justify-content-center ">
            <form className="col-10 my-4 mx-4 my-md-5 " onSubmit={handleFormSubmit}>
                <textarea className={`update ${theme} col-12`} 
                    name="text" 
                    type="text"
                    id="pasteText"
                    value={formState.text}
                    defaultValue={paste.text}
                    onChange={handleChange}
                    rows='20' /><br />
                <button className="col-12 paste-button-delete" type="submit">Paste</button>
                {error && <div>Paste Failed!</div>}
            </form>
            </div>
        </div>
        </>
    );
};

export default UpdatePaste;