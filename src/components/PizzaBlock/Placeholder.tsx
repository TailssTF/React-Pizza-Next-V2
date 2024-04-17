import ContentLoader from "react-content-loader";

export const Placeholder = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={474}
    viewBox="0 0 280 474"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="125" cy="125" r="125" />
    <rect x="0" y="317" rx="10" ry="10" width="280" height="92" />
    <rect x="0" y="440" rx="10" ry="10" width="90" height="27" />
    <rect x="125" y="428" rx="25" ry="25" width="153" height="45" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="30" />
  </ContentLoader>
);
