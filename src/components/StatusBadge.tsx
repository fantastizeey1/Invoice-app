// Status Badge Component
type StatusBadgeProps = {
  status: "paid" | "pending" | "draft" | string;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case "paid":
        return "bg-green-500/20 text-green-400 border-green-500/20";
      case "pending":
        return "bg-orange-500/20 text-orange-400 border-orange-500/20";
      case "draft":
        return "bg-gray-500/20 text-gray-400 border-gray-500/20";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium border ${getStatusStyles()}`}
    >
      <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
export default StatusBadge;
