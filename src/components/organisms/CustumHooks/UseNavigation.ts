import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

interface useNavigation {
  // navigateToWordViewPage メソッドの定義を追加する
  navigateToWordViewPage: (param: any) => void;
  navigateToAddWordPage: (param: any) => void;
}

const useNavigation = () => {
  const navigate = useNavigate();

  const navigateToWordViewPage = useCallback(() => {
    navigate("/");
  }, [navigate]);
  const navigateToAddWordPage = useCallback(() => {
    navigate("/add-word");
  }, [navigate]);

  const navigateToOtherUsersPage = useCallback(() => {
    navigate("/other-users");
  }, [navigate]);

  return {
    navigateToWordViewPage,
    navigateToAddWordPage,
    navigateToOtherUsersPage
  };
};

export default useNavigation;
