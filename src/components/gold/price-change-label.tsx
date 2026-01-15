export interface PriceChangeLabelProps {
  today: number | undefined;
  yesterday: number | undefined;
}
export default function PriceChangeLabel({
  today,
  yesterday,
}: PriceChangeLabelProps) {
  if (today === undefined || yesterday === undefined) return null;
  const diff = today - yesterday;
  if (diff === 0) return null;

  return (
    <span
      className={`ml-2 text-sm font-medium ${
        diff > 0 ? "text-green-600" : "text-red-600"
      }`}
    >
      {diff > 0 ? "▲" : "▼"} {Math.abs(diff).toLocaleString()}
    </span>
  );
};

