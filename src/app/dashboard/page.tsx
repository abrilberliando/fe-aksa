"use client";
import Image from "next/image";
import { useDashboard } from "@/hooks/useDashboard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function DashboardPage() {
  const {
    employees,
    divisions,
    loading,
    totalPages,
    pageParam,
    searchParam,
    divisionParam,
    isModalOpen,
    setIsModalOpen,
    editingItem,
    formData,
    setFormData,
    updateParams,
    openModal,
    handleSave,
    handleDelete,
  } = useDashboard();

  return (
    <div className="space-y-6 pb-10">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter italic">
            Command Center
          </h2>
          <p className="text-xs text-blue-500 font-mono font-bold animate-pulse">
            ● SYSTEM_STATUS: OPERATIONAL // PORT_8000_ACTIVE
          </p>
        </div>
        <Button onClick={() => openModal()} className="w-full md:w-auto font-black uppercase italic bg-blue-600 hover:bg-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
          + Deploy New Member
        </Button>
      </div>

      {/* 2. Dashboard Stats Section (Task 2 & 3 Stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Manpower", value: employees.length, icon: "👤", color: "border-blue-500" },
          { label: "Active Divisions", value: divisions.length, icon: "🏢", color: "border-purple-500" },
          { label: "System Pages", value: totalPages, icon: "📄", color: "border-green-500" },
          { label: "Auth Status", value: "Verified", icon: "🛡️", color: "border-yellow-500" },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-xl border-l-4 bg-white dark:bg-gray-900 shadow-sm ${stat.color} flex items-center justify-between`}>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black dark:text-white">{stat.value}</p>
            </div>
            <span className="text-2xl opacity-50">{stat.icon}</span>
          </div>
        ))}
      </div>

      <hr className="border-gray-200 dark:border-gray-800" />

      {/* 3. Filter Section with Custom Styled Select */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
           <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Search Identity</label>
           <input
            type="text"
            placeholder="Search by name..."
            value={searchParam}
            onChange={(e) => updateParams(1, e.target.value, divisionParam)}
            className="w-full p-3 rounded-xl border bg-white dark:bg-gray-950 dark:border-gray-800 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-mono text-sm"
          />
        </div>
        
        <div className="relative">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Filter Division</label>
          {/* Wrapper buat Custom Arrow */}
          <div className="relative">
            <select
              value={divisionParam}
              onChange={(e) => updateParams(1, searchParam, e.target.value)}
              className="w-full p-3 rounded-xl border bg-white dark:bg-gray-950 dark:border-gray-800 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-mono text-sm appearance-none cursor-pointer pr-10"
            >
              <option value="">ALL_DIVISIONS</option>
              {divisions.map((div) => (
                <option key={div.id} value={div.id}>
                  {div.name.toUpperCase()}
                </option>
              ))}
            </select>
            {/* Custom Arrow Icon */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Table Section */}
      <div className="border dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-950 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 uppercase font-black text-[10px] tracking-widest border-b dark:border-gray-800">
              <tr>
                <th className="px-6 py-5">Ident-ID</th>
                <th className="px-6 py-5">Full Name</th>
                <th className="px-6 py-5">Contact</th>
                <th className="px-6 py-5">Division</th>
                <th className="px-6 py-5">Position</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center animate-pulse">
                    <span className="font-mono text-blue-500 text-sm font-bold tracking-[0.2em]">FETCHING_ENCRYPTED_DATA...</span>
                  </td>
                </tr>
              ) : employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp.id} className="group hover:bg-blue-500/5 transition-all">
                    <td className="px-6 py-4">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-gray-100 dark:border-gray-800 group-hover:border-blue-500/50 transition-colors bg-gray-200">
                        <Image src={emp.image} alt={emp.name} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-black dark:text-white uppercase tracking-tight">{emp.name}</p>
                      <p className="text-[10px] text-gray-500 font-mono">ID: {emp.id.slice(0, 8)}...</p>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{emp.phone}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                        {emp.division.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 font-medium italic">{emp.position}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => openModal(emp)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-500 hover:text-white transition-all">✏️</button>
                        <button onClick={() => handleDelete(emp.id)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white transition-all">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-gray-500 font-mono italic">
                    {"// NO_RECORDS_FOUND_IN_DATABASE"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-5 border-t dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Page <span className="text-blue-600">{pageParam}</span> of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" disabled={pageParam <= 1} onClick={() => updateParams(pageParam - 1, searchParam, divisionParam)} className="text-[10px] font-black uppercase tracking-tighter">
              [ Previous ]
            </Button>
            <Button variant="ghost" disabled={pageParam >= totalPages} onClick={() => updateParams(pageParam + 1, searchParam, divisionParam)} className="text-[10px] font-black uppercase tracking-tighter">
              [ Next ]
            </Button>
          </div>
        </div>
      </div>

      {/* 5. Modal CRUD */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? ">> SYSTEM_OVERRIDE: EDIT" : ">> SYSTEM_AUTH: ADD"}>
        <form onSubmit={handleSave} className="space-y-4 pt-4">
          <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Upload Personnel Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
              className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Identity Name", key: "name", type: "text" },
              { label: "Comms Number", key: "phone", type: "text" },
            ].map((f) => (
              <div key={f.key} className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">{f.label}</label>
                <input
                  required
                  type={f.type}
                  value={formData[f.key as keyof typeof formData] as string}
                  onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                  className="w-full p-3 rounded-xl border dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-600 outline-none font-mono text-sm"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Assigned Division</label>
              <select
                required
                value={formData.division}
                onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                className="w-full p-3 rounded-xl border dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-600 outline-none font-mono text-sm"
              >
                <option value="">SELECT_DIV</option>
                {divisions.map((div) => (
                  <option key={div.id} value={div.id}>{div.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Rank / Position</label>
              <input
                required
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full p-3 rounded-xl border dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-600 outline-none font-mono text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="uppercase font-black text-xs">Abort</Button>
            <Button type="submit" className="px-10 font-black uppercase italic bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)]">Save_Changes</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}