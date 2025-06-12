// Status Badge Component
type StatusBadgeProps = {
  status: "paid" | "pending" | "draft" | string;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case "paid":
        return "bg-[#33D69F]/20 text-[#33D69F] ";
      case "pending":
        return "bg-[#FF8F00]/20 text-[#FF8F00] ";
      case "draft":
        return "bg-[#373B53]/20 text-[#373B53] dark:text-[#FFFFFF] ";
      default:
        return "bg-[#373B53]/20 text-[#373B53] ";
    }
  };

  return (
    <span
      className={`flex items-center w-[104px] h-10  justify-center px-3 py-1 rounded-md text-sm font-medium border ${getStatusStyles()}`}
    >
      <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
export default StatusBadge;
