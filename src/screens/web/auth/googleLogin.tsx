import React from "react";
import MobileGoogleLogin, { signOut } from "../../mobile/auth/googleLogin";

export default function GoogleLogin(props: any) {
  return <MobileGoogleLogin {...props} />;
}

export { signOut };
