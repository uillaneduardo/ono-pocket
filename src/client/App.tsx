import React from 'react';
import { HealthStatus } from './components/HealthStatus';
import { Database, ShieldCheck, Cpu, Code2, Rocket, Layers, Check } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-teal-900/30 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-teal-600/20 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-lg">
              OP
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-100 leading-none">Ono Pocket</h1>
              <span className="text-xs text-teal-400/80 font-mono">SPEC-001 • Project Foundation</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-xs font-mono rounded-full bg-teal-950/80 border border-teal-800/60 text-teal-300 flex items-center space-x-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>v0.1.0</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 space-y-8">
        {/* Banner */}
        <div className="rounded-2xl border border-teal-800/40 bg-gradient-to-br from-slate-900 via-teal-950/20 to-slate-900 p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-900/40 border border-teal-700/50 text-teal-300 text-xs font-medium">
              <Rocket className="h-3.5 w-3.5" />
              <span>Fundação Técnica Inicial</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Simulador & Gestão Leve de Onos
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Página inicial temporária referente à **SPEC-001 — Project Foundation**. A infraestrutura base foi configurada com React + TypeScript + Vite, backend Node.js + Express, Prisma ORM (MySQL), testes Vitest e suporte a PWA.
            </p>
          </div>
        </div>

        {/* Server Health Section */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-400">Verificação de Infraestrutura</h3>
          <HealthStatus />
        </section>

        {/* Foundation Modules Overview */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-400">Módulos de Fundação Configurados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
              <div className="flex items-center space-x-2 text-teal-400">
                <Code2 className="h-5 w-5" />
                <h4 className="font-semibold text-slate-200">Frontend & PWA</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                React 18 + TypeScript + Vite + Tailwind CSS. Estrutura PWA com Service Worker e Web App Manifest prontos.
              </p>
              <div className="pt-2 flex items-center text-xs text-emerald-400 space-x-1">
                <Check className="h-3.5 w-3.5" />
                <span>Pronto</span>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
              <div className="flex items-center space-x-2 text-cyan-400">
                <Cpu className="h-5 w-5" />
                <h4 className="font-semibold text-slate-200">Backend & REST API</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Node.js + Express + TypeScript. Middleware CORS, rotas de health check atômicas e suporte a middleware Vite dev.
              </p>
              <div className="pt-2 flex items-center text-xs text-emerald-400 space-x-1">
                <Check className="h-3.5 w-3.5" />
                <span>Pronto</span>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Database className="h-5 w-5" />
                <h4 className="font-semibold text-slate-200">Prisma ORM (MySQL)</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Schema do Prisma configurado para MySQL/MariaDB com cliente compilado e migrations preparadas.
              </p>
              <div className="pt-2 flex items-center text-xs text-emerald-400 space-x-1">
                <Check className="h-3.5 w-3.5" />
                <span>Pronto</span>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
              <div className="flex items-center space-x-2 text-indigo-400">
                <ShieldCheck className="h-5 w-5" />
                <h4 className="font-semibold text-slate-200">Qualidade & Testes</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                ESLint 9, TypeScript typechecking rigoroso e Vitest + Supertest para testes automatizados da API.
              </p>
              <div className="pt-2 flex items-center text-xs text-emerald-400 space-x-1">
                <Check className="h-3.5 w-3.5" />
                <span>Pronto</span>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400">
                <Layers className="h-5 w-5" />
                <h4 className="font-semibold text-slate-200">CI / GitHub Actions</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Workflow automatizado em <code className="text-amber-300">.github/workflows/ci.yml</code> executando lint, typecheck, testes e build.
              </p>
              <div className="pt-2 flex items-center text-xs text-emerald-400 space-x-1">
                <Check className="h-3.5 w-3.5" />
                <span>Pronto</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>Ono Pocket © 2026 • Documentado sob ADR-001 — Project Foundation</p>
      </footer>
    </div>
  );
};
