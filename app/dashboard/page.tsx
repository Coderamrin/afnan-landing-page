import Link from "next/link";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";
import StatusBadge from "@/components/dashboard/StatusBadge";

export default async function DashboardPage() {
  const allOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt));

  // Statistics
  const totalOrders = allOrders.length;
  const totalRevenue = allOrders.reduce(
    (sum, order) => sum + parseFloat(order.total as string),
    0
  );
  const pendingOrders = allOrders.filter(
    (order) => order.status === "pending"
  ).length;
  const deliveredOrders = allOrders.filter(
    (order) => order.status === "delivered"
  ).length;

  const formatDate = (date: Date | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return `৳${num.toLocaleString("bn-BD")}`;
  };

  const statCards = [
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Pending",
      value: pendingOrders.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      title: "Delivered",
      value: deliveredOrders.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-[#1a6b2e]",
      bgColor: "bg-green-50",
      textColor: "text-[#1a6b2e]",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Home Link */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#1a1a1a]">Order Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Manage and track all your orders
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-[#1a1a1a] font-semibold"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card) => (
            <div
              key={card.title}
              className={`${card.bgColor} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} text-white p-3 rounded-xl`}>
                  {card.icon}
                </div>
              </div>
              <p className={`text-sm font-semibold ${card.textColor} mb-1`}>
                {card.title}
              </p>
              <p className="text-3xl font-black text-[#1a1a1a]">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {allOrders.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg font-semibold">No orders yet</p>
              <p className="text-gray-400 text-sm mt-1">Orders will appear here once customers start placing them</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#f0faf3] to-white border-b border-gray-200">
                    <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Size & Qty
                    </th>
                    <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-semibold text-[#1a1a1a]">
                            {order.customerName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.customerPhone}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-[#1a6b2e] text-lg">
                          {formatCurrency(order.total)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <p className="font-semibold">
                            {order.size}" × {order.quantity} pcs
                          </p>
                          <p className="text-gray-500">{order.productName}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </span>
                      </td>
                      <td className="p-4">
                        <StatusBadge
                          orderId={order.id}
                          currentStatus={order.status}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
