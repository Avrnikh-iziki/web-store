import React from "react";
import { Route, Redirect } from 'react-router-dom'

function Routes({ component: Component, ...rest }) {
  return < Route
    {...rest}
    render={(props) => {
      var des = rest.des
      if (rest.isAuth) {
        return <Component  {...props} />
      } else {
        return <Redirect to={{ pathname: des, state: { from: props.location } }} />
      }
    }
    }
  />
}

export default Routes




