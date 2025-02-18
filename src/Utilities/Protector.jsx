import React, { useContext } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { ContentContext } from "../Context/Content";
import StorageHelper from "../Auth/StorageHelper";

export const RequireAuth = ({ children }) => {
    const location = useLocation();
    const token=StorageHelper.getToken()
    

    if (!token) {
       
        return <Navigate to="/login" state={{ path: location.pathname }} />
    }
    return children;
}

export const RequireAuthLogout = ({ children }) => {
    const location = useLocation();
    const { token } = useContext(ContentContext);

    if (token) {
        return <Navigate to="/" state={{ path: location.pathname }} />
    }
    return children;
}
