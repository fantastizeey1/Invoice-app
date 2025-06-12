// components/EmptyState.tsx

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 ">
      <div className="my-10">
        <img
          src="/Flatline.svg"
          alt="Empty invoices"
          className="w-64 h-auto mx-auto"
        />
      </div>

      {/* Message */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0C0E16] dark:text-[#ffffff]">
          There is nothing here
        </h2>
        <p className="text-sm  text-[#888EB0] dark:text-[#DFE3FA]">
          Create an invoice by clicking the <br />
          <span className="font-semibold">New Invoice</span> button and get
          started
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
