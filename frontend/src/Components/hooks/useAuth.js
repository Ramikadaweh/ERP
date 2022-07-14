const useAuth = () => {

  return {
    auth: localStorage.getItem("token") ? true : false,
  };
};

export default useAuth;
