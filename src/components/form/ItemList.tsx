import React from "react";
import { Trash2 } from "lucide-react";
import type { ItemListProps } from "@/types";

const ItemList: React.FC<ItemListProps> = ({
  items,
  onItemUpdate,
  onItemRemove,
  onAddItem,
  errors = {},
}) => {
  const total = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
        Item List
      </h3>

      {/* Desktop headers */}
      <div className="hidden sm:grid sm:grid-cols-12 gap-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
        <div className="col-span-5">Item Name</div>
        <div className="col-span-2 text-center">Qty.</div>
        <div className="col-span-2 text-right">Price</div>
        <div className="col-span-2 text-right">Total</div>
        <div className="col-span-1"></div>
      </div>

      {items.map((item) => (
        <div key={item.id} className="space-y-4 sm:space-y-0">
          <div className="sm:hidden">
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => onItemUpdate(item.id, "name", e.target.value)}
              className={`w-full px-4 py-3 bg-white dark:bg-[#1E2139] border rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-[#9277FF] focus:border-transparent ${
                errors[item.id]?.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {errors[item.id]?.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors[item.id].name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-12 gap-4">
            <div className="hidden sm:block sm:col-span-5">
              <input
                type="text"
                value={item.name}
                onChange={(e) => onItemUpdate(item.id, "name", e.target.value)}
                placeholder="Item name..."
                className={`w-full px-4 py-3 bg-white dark:bg-[#1E2139] border rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-[#9277FF] focus:border-transparent ${
                  errors[item.id]?.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors[item.id]?.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[item.id].name}
                </p>
              )}
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2 sm:hidden">
                Qty. <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  onItemUpdate(
                    item.id,
                    "quantity",
                    parseInt(e.target.value) || 0
                  )
                }
                min="1"
                className={`w-full px-4 py-3 bg-white dark:bg-[#1E2139] border rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-[#9277FF] focus:border-transparent text-center ${
                  errors[item.id]?.quantity
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors[item.id]?.quantity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[item.id].quantity}
                </p>
              )}
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2 sm:hidden">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={item.price}
                onChange={(e) =>
                  onItemUpdate(
                    item.id,
                    "price",
                    parseFloat(e.target.value) || 0
                  )
                }
                step="0.01"
                min="0"
                className={`w-full px-4 py-3 bg-white dark:bg-[#1E2139] border rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-[#9277FF] focus:border-transparent text-right ${
                  errors[item.id]?.price
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors[item.id]?.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[item.id].price}
                </p>
              )}
            </div>

            <div className="col-span-1 sm:col-span-2 flex items-center">
              <div className="w-full">
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2 sm:hidden">
                  Total
                </label>
                <div className="px-4 py-3 bg-gray-50 dark:bg-[#252945] border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white text-right font-medium">
                  £{item.total.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="col-span-3 sm:col-span-1 flex items-end justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => onItemRemove(item.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={items.length === 1}
                title={
                  items.length === 1
                    ? "Cannot remove the last item"
                    : "Remove item"
                }
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={onAddItem}
        className="w-full px-4 py-3 bg-gray-100 dark:bg-[#252945] text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
      >
        + Add New Item
      </button>

      {/* Total Section */}
      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Amount
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            £{total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
