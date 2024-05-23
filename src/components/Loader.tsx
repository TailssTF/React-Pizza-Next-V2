import FadeSpinner from "./FadeSpinner";

const Loader = () => {
  return (
    <div className="modal-backdrop">
      <div className="spinner">
        <FadeSpinner />
      </div>
    </div>
  );
};

export default Loader;
