import React from "react";
// import { useQuery } from "@apollo/client";
// import { QUERY_PASTES } from '../utils/queries';
import PasteList from "../components/PasteList";
// import auth from "../utils/auth";
// import LoginForm from '../components/LoginForm';

const Home = () => {
    // const { loading, data } = useQuery(QUERY_PASTES);
    // const pastes = data?.pastes || [];

    // const loggedIn = auth.loggedIn();
    const pastes = [
        { uuid: 1, text: 'testing testing testing testing testing testing testing testing testing testing testing'},
        { uuid: 2, text: 'test2 test2 test2 test2 test2 test2 test2 test2 test2 test2 test2 test2 test2 test2 test2'},
        { uuid: 3, text: 'ooga booga ooga booga ooga booga ooga booga ooga booga ooga booga ooga booga ooga booga'}
    ];

    return (
        <main>
            {/* {loggedIn ? ( } */}
            <div className="flex-row justify-space-between">
                {/*{loading ? ( */}
                {/* <div>Loading...</div> */}
                {/* ):( */}
                <PasteList pastes={pastes} />
            </div>
            {/* ):( */}
            {/*
                <LoginForm />
                )} 
            */}
        </main>
    );
};

export default Home;