import { useContext, useEffect } from "react";
import type GuardProps from "../../model/propos/guard_props";
import { UserContext } from "../../provider/UserProvider";
import { Navigate, useNavigate } from "react-router-dom";

const Guard = ({ children, roles }: GuardProps) => {
	// importer le contexte
	const { user } = useContext(UserContext);

	// redirection
	const navigate = useNavigate();

	useEffect(() => {
		if (roles.indexOf(user.role?.name) === -1) {
			//stocker un message dans la session
			window.sessionStorage.setItem("notice", "Access denied");
			//redirection
			navigate("/");
		}
	}, [roles, user, navigate]);

	return <>{children}</>;
};

export default Guard;
