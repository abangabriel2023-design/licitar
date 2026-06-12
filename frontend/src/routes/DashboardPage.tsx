import { useQuery } from "@tanstack/react-query";
import { getResumen } from "@/services/estadisticas";
import Spinner from "@/components/Spinner";

import {
  FileText,
  CheckCircle,
  XCircle,
  Award,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["resumen"],
    queryFn: getResumen,
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          LicitAR Intelligence
        </h1>

        <p className="text-slate-400 mt-2">
          Centro de monitoreo de licitaciones públicas y oportunidades estratégicas.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Licitaciones",
            value: data?.total,
            icon: FileText,
            color: "text-cyan-400",
          },
          {
            label: "Activas",
            value: data?.abiertas,
            icon: CheckCircle,
            color: "text-green-400",
          },
          {
            label: "Finalizadas",
            value: data?.cerradas,
            icon: XCircle,
            color: "text-orange-400",
          },
          {
            label: "Adjudicadas",
            value: data?.adjudicadas,
            icon: Award,
            color: "text-purple-400",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon size={20} className={color} />
              <span className="text-sm text-slate-400 uppercase tracking-wide">
                {label}
              </span>
            </div>

            <p className="text-4xl font-bold text-white">
              {value ?? 0}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">
          Actividad de Licitaciones
        </h3>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={[
                {
                  nombre: "Activas",
                  valor: data?.abiertas ?? 0,
                },
                {
                  nombre: "Finalizadas",
                  valor: data?.cerradas ?? 0,
                },
                {
                  nombre: "Adjudicadas",
                  valor: data?.adjudicadas ?? 0,
                },
              ]}
            >
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="valor" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            🤖 Centro de Inteligencia
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Oportunidades detectadas</span>
              <span className="text-cyan-400 font-bold">12</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Organismos activos</span>
              <span className="text-green-400 font-bold">5</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Actividad del sistema</span>
              <span className="text-yellow-400 font-bold">Alta</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Estado IA</span>
              <span className="text-purple-400 font-bold">Operativo</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            🔔 Próximos Eventos
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-white font-medium">
                Licitación Hospital Central
              </p>
              <p className="text-slate-400 text-sm">
                Cierre estimado en 3 días
              </p>
            </div>

            <div>
              <p className="text-white font-medium">
                Compra de Insumos Médicos
              </p>
              <p className="text-slate-400 text-sm">
                Nueva publicación
              </p>
            </div>

            <div>
              <p className="text-white font-medium">
                Actualización de proveedores
              </p>
              <p className="text-slate-400 text-sm">
                Últimas 24 horas
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}