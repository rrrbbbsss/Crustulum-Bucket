import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from '../utils/queries';
import PasteList from "../components/PasteList";
import auth from "../utils/auth";
import Login from "./Login";
import SignUp from "./Signup";
import Header from "../components/Header";

const Home = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const pastes = data?.me.pastes || [];

    const loggedIn = auth.loggedIn();

    return (
        <main>
            {loggedIn ? (
            <>
            <Header /> 
            <div className="flex-row justify-space-between">
                {loading ? ( 
                <div>Loading...</div> 
                 ):( 
                <PasteList pastes={pastes} />
                 )}
            </div>
            </>
            ):( 
                <Login />
                )} 
        </main>
    );
};

export default Home;