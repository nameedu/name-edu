
const LoadingState = () => {
  return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading results...</p>
    </div>
  );
};

export default LoadingState;
