import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from '../utils/queries';
import PasteList from "../components/PasteList";
import auth from "../utils/auth";
import Login from "./Login";
// import SignUp from "./Signup";
import Header from "../components/Header";

const Home = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const pastes = data?.me.pastes || [];
    const orderedPastes = [...pastes];
    orderedPastes.reverse();

    const loggedIn = auth.loggedIn();

    return (
        <main>
            {loggedIn ? (
            <>
            <Header /> 
            <div className="flex-row justify-space-between">
                {loading ? ( 
                <div><i class="fa-solid fa-satellite fa-spin error loading"></i></div> 
                 ):( 
                <PasteList pastes={orderedPastes} />
                 )}
            </div>
            </>
            ):( 
              <div>
                <Login />
              </div>
                )} 
        </main>
    );
};

export default Home;