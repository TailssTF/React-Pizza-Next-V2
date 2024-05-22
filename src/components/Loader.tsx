import FadeSpinner from "./FadeSpinner";

const Loader = () => {
  return (
    <div className="modal-backdrop">
      <FadeSpinner />
    </div>
  );
};

export default Loader;
