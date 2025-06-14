import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
const logmid = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const callPostLoginAPI = async () => {
    try {
      const token = searchParams.get("token");
      const role = searchParams.get("role");

      const res = await axios.post(
        "https://baggagebugs-1.onrender.com/api/v1/user/setCookies",
        { token, role },
        { withCredentials: true }
      );
      console.log("User session verified:", res.data);
      navigate("/landingpage");
    } catch (err) {
      console.error("Session check failed:", err);
      navigate("/");
    }
  };

  // React.useEffect(() => {
  //     callPostLoginAPI();
  // }, []);

  return (
    <div className="auth_card">
      <button onClick={callPostLoginAPI}>Login</button>
      Logging in ...
    </div>
  );
}

export default logmid
