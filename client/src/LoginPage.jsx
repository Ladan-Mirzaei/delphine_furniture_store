import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function LoginPage() {
  const navigate = useNavigate();
  const { isLoading } = useAuth0();
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (!isLoading) {
      navigate(redirectTo);
    }
  }, [redirectTo, navigate, isLoading]);

  return (
    <>
      <h2>Redirecting...</h2>
    </>
  );
}
