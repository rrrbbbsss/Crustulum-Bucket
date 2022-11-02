import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_PASTE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

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
        return    <div className='e-div fa-fade '>
                       <div className="error3">
                        
                            <h4><b>Lets Get Crusty</b></h4>
                            <h4><b>You have no pastes yet</b></h4>
                            <h4><b>Create your first paste this way <Link to="/paste"><i class={`${theme} fa-solid fa-arrow-right`}></i></Link></b></h4>
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
                                     <div className="copy-button" onClick={() => {
                                            navigator.clipboard.writeText(`https://crustulum-bucket.herokuapp.com/paste/${paste.uuid}`);}}><span>
                                            <i className="fa-solid fa-copy"></i>
                                            </span>
                                        </div>
                                    <textarea className={`${theme} col-12`} rows="20" readOnly={true} defaultValue={paste.text} />
                                    <Link to={`/update-paste/${paste.uuid}`}>
                                    <button className={`col-12 paste-button-delete`} type="edit">Edit</button></Link>{' '}
                                    <button className=" mt-5 col-12 paste-button-delete" value={paste.uuid} type="delete" onClick={handleDelete}>Delete</button>
                                    {error && <div>Delete Failed!</div>}
                                </div>
                            </div>
                        ))}
                        
                </div>

            
    );
};




export default PasteList;