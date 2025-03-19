import { Children, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = () => {
    const { user, loading } = useContext(AuthContext)

    if(loading){
        return(
            <div>Cargando...</div>
        )
    }

    return user ? Children : <Navigate to="/login" />
}

export default PrivateRoute;