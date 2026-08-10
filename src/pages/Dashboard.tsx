import { useState } from "react";
import { geminiModel } from "../services/gemini";

export function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  async function handleAskAI() {
    setLoading(true);
    try {
      const result = await geminiModel.generateContent(
        "Halo Gemini, integrasi React berhasil!",
      );
      setAiResponse(result.response.text());
    } catch (error) {
      console.error("Error Gemini API:", error);
      setAiResponse("Gagal memanggil API. Cek console browser (F12).");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Widget Tes Gemini API */}
      <div className="p-4 border rounded-xl bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Uji Coba Gemini AI</h2>

        <button
          onClick={handleAskAI}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Tanya AI"}
        </button>

        {aiResponse && (
          <div className="mt-4 p-3 bg-slate-100 dark:bg-zinc-800 rounded-lg text-sm leading-relaxed">
            {aiResponse}
          </div>
        )}
      </div>
    </div>
  );
}
