import useNavStore from "../store/nav/useNavStore";

const getClassName = () => {
  const { open } = useNavStore((state) => state);
  return open ? "nav-open" : "nav-close";
};

export default getClassName;
