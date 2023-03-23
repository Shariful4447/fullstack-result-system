import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ auth = false, redirectTo, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
