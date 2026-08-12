import React, { useEffect, useState } from 'react';
import { Activity, CheckCircle, AlertCircle, RefreshCw, Server, Clock } from 'lucide-react';

interface HealthData {
  status: string;
  service: string;
  serverTime: string;
  uptime: number;
  environment?: string;
}

export const HealthStatus: React.FC = () => {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${baseUrl}/api/health`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json: HealthData = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha na conexão com backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="rounded-xl border border-teal-900/40 bg-slate-900/60 p-6 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
        <div className="flex items-center space-x-3">
          <Activity className="h-5 w-5 text-teal-400" />
          <h3 className="text-base font-semibold text-slate-200">Status do Servidor REST</h3>
        </div>
        <button
          onClick={fetchHealth}
          disabled={loading}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-teal-300 bg-teal-950/60 hover:bg-teal-900/50 border border-teal-800/50 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Atualizar</span>
        </button>
      </div>

      {loading && !data ? (
        <div className="py-6 text-center text-sm text-slate-400">Verificando endpoint /api/health...</div>
      ) : error ? (
        <div className="flex items-center space-x-3 p-4 bg-red-950/40 border border-red-900/50 rounded-lg text-red-300 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
          <div>
            <p className="font-semibold">Erro no backend REST</p>
            <p className="text-xs text-red-400/80">{error}</p>
          </div>
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/60">
            <div className="flex items-center space-x-2 text-slate-400 mb-1">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Estado</span>
            </div>
            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wide">{data.status}</span>
          </div>

          <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/60">
            <div className="flex items-center space-x-2 text-slate-400 mb-1">
              <Server className="h-4 w-4 text-teal-400" />
              <span>Serviço</span>
            </div>
            <span className="text-sm font-semibold text-slate-200">{data.service}</span>
          </div>

          <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/60">
            <div className="flex items-center space-x-2 text-slate-400 mb-1">
              <Clock className="h-4 w-4 text-cyan-400" />
              <span>Uptime</span>
            </div>
            <span className="text-sm font-semibold text-slate-200">{Math.floor(data.uptime)}s</span>
          </div>

          <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/60">
            <div className="flex items-center space-x-2 text-slate-400 mb-1">
              <Clock className="h-4 w-4 text-indigo-400" />
              <span>Horário</span>
            </div>
            <span className="text-sm font-semibold text-slate-200" title={data.serverTime}>
              {new Date(data.serverTime).toLocaleTimeString()}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
