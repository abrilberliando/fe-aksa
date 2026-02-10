"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePagination } from "@/hooks/usePagination";
import { storage } from "@/lib/storage";
import { DataItem } from "@/types";

const INITIAL_DATA: DataItem[] = Array.from({ length: 15 }, (_, i) => ({
  id: `${Date.now()}-${i}`,
  name: `User Demo ${i + 1}`,
  role: i % 2 === 0 ? "Frontend Dev" : "UI/UX Designer",
  email: `user${i + 1}@aksa.id`
}));

export const useDashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<DataItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);
  const [formData, setFormData] = useState({ name: "", role: "", email: "" });

  // Load Data
  useEffect(() => {
    const timer = setTimeout(() => {
      const storedData = storage.get<DataItem[]>("crud_data");
      if (!storedData) {
        storage.set("crud_data", INITIAL_DATA);
        setData(INITIAL_DATA);
      } else {
        setData(storedData);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Filter & Pagination Logic
  const pageParam = Number(searchParams.get("page")) || 1;
  const searchParam = searchParams.get("search") || "";

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchParam.toLowerCase()) ||
    item.role.toLowerCase().includes(searchParam.toLowerCase())
  );

  const ITEMS_PER_PAGE = 5;
  const { startIndex, endIndex, totalPages } = usePagination(filteredData.length, ITEMS_PER_PAGE, pageParam);
  const currentData = filteredData.slice(startIndex, endIndex);

  // Sync URL
  const updateParams = (newPage: number, newSearch: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    params.set("page", newPage.toString());
    router.replace(`?${params.toString()}`);
  };

  // Handlers
  const openModal = (item?: DataItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({ name: item.name, role: item.role, email: item.email });
    } else {
      setEditingItem(null);
      setFormData({ name: "", role: "", email: "" });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let newData;
    if (editingItem) {
      newData = data.map((d) => (d.id === editingItem.id ? { ...d, ...formData } : d));
    } else {
      const newItem: DataItem = { id: Date.now().toString(), ...formData };
      newData = [newItem, ...data];
    }
    setData(newData);
    storage.set("crud_data", newData);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("yakin ?")) {
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
      storage.set("crud_data", newData);
    }
  };

  return {
    data: currentData,
    totalPages,
    pageParam,
    searchParam,
    isModalOpen,
    setIsModalOpen,
    editingItem,
    formData,
    setFormData,
    updateParams,
    openModal,
    handleSave,
    handleDelete
  };
};