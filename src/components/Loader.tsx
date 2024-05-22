import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="modal-backdrop">
      <FadeLoader color="#fe5f1e" />
    </div>
  );
};

export default Loader;
