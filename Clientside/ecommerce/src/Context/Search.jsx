import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();
const SearchProvider =  ( { children }) => {
    const [auth, setAuth] = useState({
        keyword: "",
        results: [],
    });

    return (
        <SearchContext.Provider value={[auth,setAuth]}>
            {children}
        </SearchContext.Provider>
    );
};

//to customise hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider};