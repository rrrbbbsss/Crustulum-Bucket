import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { READ_PASTE } from "../utils/queries";
import { formatDate } from "../utils/date";
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
    <div className="error fa-fade not-found">Hold on now Brad Pastely</div>
    <p className="error3 fa-fade ">That paste hasn't been seen round these parts in years</p>
    <Link  to="/"><p className="error3 ">How bout you giddy up on home now...</p></Link>
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
          Expires on {formatDate(paste.expires)}
        </p>
        <div className="row justify-content-center">
          <div
            className="copy-button2"
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/paste/${paste.uuid}`
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
