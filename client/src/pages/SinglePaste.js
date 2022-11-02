import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { READ_PASTE } from "../utils/queries";
// import auth from "../utils/auth";
import Header from "../components/Header";

const SinglePaste = () => {
  const [theme, setTheme] = useState("paste-text-dark");
  const toggleTheme = () => {
    if (theme === "paste-text-dark") {
      setTheme("past-text");
    } else {
      setTheme("paste-text-dark");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const { id: pasteId } = useParams();

  const { loading, error, data } = useQuery(READ_PASTE, {
    variables: { input: { uuid: pasteId } },
  });

  const paste = data?.readPaste || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {

    return (
    <div className="e-div">
    <div className="error fa-fade not-found">Paste Not Found</div>
    <Link  to="/"><p className="error3 ">Click here to return home...</p></Link>
    </div>
    )
  }

  return (
    <>
      <Header />
      <div key={paste.uuid} className=" row justify-content-center ">
        <p className="error2">
          Paste #{paste.uuid}
          <br />
          Expires on {paste.expires}
        </p>
        <div className="row justify-content-center">
          <div
            className="copy-button2"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://crustulum-bucket.herokuapp.com/paste/${paste.uuid}`
              );
            }}
          >
            <span>
              <i className="fa-solid fa-copy"></i>
            </span>
          </div>
          <textarea
            className={` ${theme} col-8`}
            rows="20"
            readOnly={true}
            defaultValue={paste.text}
          />
        </div>
      </div>
    </>
  );
};

export default SinglePaste;
