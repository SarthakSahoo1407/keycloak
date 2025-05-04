import React, { useEffect, useRef, useState } from "react";
import  Keycloak  from "keycloak-js";

const client = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_REALM,
});

const useAuth = () => {
    const isRun = useRef(false);    
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => { 
        if (isRun.current) return;   
        isRun.current = true;
    
        client.init({ onLoad: "login-required" })
            .then((authenticated) => {
                console.log("authenticated", authenticated);
                setIsLogin(authenticated);
            })
            .catch((error) => {
                console.error("Keycloak init failed:", error);
            });
    }, []);
    
    return isLogin;
};

export default useAuth;
