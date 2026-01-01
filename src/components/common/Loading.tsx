import LoadingSpinner from "./LoadingSpinner";

const Loading = () => {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <LoadingSpinner size={60} />
    </div>
  );
};

export default Loading;
