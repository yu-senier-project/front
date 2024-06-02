import { useNavigate, useLocation } from "react-router-dom";

function usePreserveQueryParams() {
  const navigate = useNavigate();
  const location = useLocation();

  const preserveParams = (path) => {
    const searchParams = new URLSearchParams(location.search);
    navigate(`${path}?${searchParams.toString()}`);
  };

  return preserveParams;
}

export default usePreserveQueryParams;
