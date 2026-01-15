import { HashLoader } from "react-spinners";

interface LoadingSpinnerProps {
  loading?: boolean;
  size?: number;
  color?: string;
  className?: string;
}

const LoadingSpinner = ({
  loading = true,
  size = 50,
  color = "#dc2626",
  className = "",
}: LoadingSpinnerProps) => {
  if (!loading) return null;

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      {/* @ts-ignore */}
      <HashLoader color={color} loading={loading} size={size} />
    </div>
  );
};

export default LoadingSpinner;
