/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/axios";
import { Employee, Division, ApiResponse } from "@/types";

export const useDashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // API Data States
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(false);
  
  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    division: "",
    position: "",
    image: null as File | null,
  });

  // URL Params Logic
  const pageParam = Number(searchParams.get("page")) || 1;
  const searchParam = searchParams.get("search") || "";
  const divisionParam = searchParams.get("division") || "";
  const [totalPages, setTotalPages] = useState(1);

  // 1. Fetch Data dari Laravel (Task 2 & 3)
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch Divisions (Buat dropdown di modal/filter)
      const divRes = await api.get<ApiResponse<{ divisions: Division[] }>>("/divisions");
      setDivisions(divRes.data.data.divisions);

      // Fetch Employees with Filter & Pagination
      const empRes = await api.get<ApiResponse<{ employees: Employee[] }>>("/employees", {
        params: {
          name: searchParam,
          division_id: divisionParam,
          page: pageParam,
        },
      });
      setEmployees(empRes.data.data.employees);
      setTotalPages(empRes.data.pagination?.last_page || 1);
    } catch (err) {
      console.error("Fetch error, G!", err);
    } finally {
      setLoading(false);
    }
  }, [searchParam, divisionParam, pageParam]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Sync URL Params
  const updateParams = (newPage: number, newSearch: string, newDiv?: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newDiv) params.set("division", newDiv);
    params.set("page", newPage.toString());
    router.replace(`?${params.toString()}`);
  };

  // Handlers
  const openModal = (item?: Employee) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        phone: item.phone,
        division: item.division.id,
        position: item.position,
        image: null,
      });
    } else {
      setEditingItem(null);
      setFormData({ name: "", phone: "", division: "", position: "", image: null });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("division", formData.division);
    data.append("position", formData.position);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editingItem) {
        // Task 5: Update (Gunakan POST + _method PUT untuk Multipart)
        data.append("_method", "PUT");
        await api.post(`/employees/${editingItem.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Task 4: Create
        await api.post("/employees", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setIsModalOpen(false);
      fetchData(); // Refresh data
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal simpan data!");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin mau hapus data ini, G?")) {
      try {
        await api.delete(`/employees/${id}`);
        fetchData();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        alert("Gagal hapus!");
      }
    }
  };

  return {
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
  };
};