import ContentLoader from "react-content-loader";

export const Placeholder = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={376}
    viewBox="0 0 280 376"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="340" rx="10" ry="10" width="90" height="27" />
    <rect x="180" y="331" rx="25" ry="25" width="100" height="45" />
    <rect x="20" y="285" rx="10" ry="10" width="230" height="30" />
    <circle cx="130" cy="130" r="130" />
  </ContentLoader>
);
