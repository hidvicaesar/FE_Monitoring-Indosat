// src/app/services/apiClient.js
import axios from "axios";

// ============================================================================
// 1. MESIN API ASLI
// ============================================================================
const apiClient = axios.create({
  // Jika VITE_API_URL tidak ada di .env, otomatis pakai http://127.0.0.1:8000
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;

// ============================================================================
// 2. P3K PENAMBAL SEMENTARA (Agar layar tidak putih)
// Nanti akan kita hapus satu per satu tiap kali halaman aslinya selesai dibuat
// ============================================================================
export const fetchDashboardSummary = async () => {
  return {
    totalDevices: 0, onlineDevices: 0, offlineDevices: 0,
    criticalAlerts: 0, warningAlerts: 0, avgResponseTime: 0, networkUptime: 0
  };
};

export const fetchDevices = async () => { return []; };
export const fetchNetworkMetrics = async () => { return []; };
export const fetchMemoryMetrics = async () => { return []; };
export const fetchTemperatureMetrics = async () => { return []; };
export const fetchCPUMetrics = async () => { return []; };