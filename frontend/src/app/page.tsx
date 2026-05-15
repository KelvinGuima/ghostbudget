'use client';

import { FileSpreadsheet } from 'lucide-react';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Toaster, toast } from 'sonner';
import { UploadForm } from '@/components/UploadForm';
import { TransactionList } from '@/components/TransactionList';
import { ExpenseChart } from '@/components/ExpenseChart';
import { api } from '@/services/api';
import { Transaction } from '@/types/transaction';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  async function handleUpload(file: File) {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast.error('Formato inválido. Envie apenas arquivos .csv');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/upload', formData);
      setTransactions(response.data);
      toast.success('Transações importadas com sucesso!');
    } catch (error) {
      toast.error('Erro ao processar o arquivo. Tente novamente.');
      console.error('Upload Error:', error);
    } finally {
      setIsUploading(false);
    }
  }

  const chartData = useMemo(() => {
    if (!transactions.length) return [];

    const grouped: Record<string, number> = {};

    transactions.forEach((t) => {
      if (t.amount < 0) {
        grouped[t.category] = (grouped[t.category] || 0) + Math.abs(t.amount);
      }
    });

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value); 
  }, [transactions]);

  const hasData = transactions.length > 0;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-200">
      <Toaster position="top-right" richColors />

      <header className="bg-[#0B0F19] border-b border-slate-800 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="relative flex items-center h-full pt-2">
            <Image 
              src="/logo.svg" 
              alt="GhostBudget Logo" 
              width={220} 
              height={70} 
              priority
              className="object-contain drop-shadow-md"
            />
          </div>
          
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-emerald-400 tracking-wide uppercase">Sistema Online</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8 mt-6">
        <section aria-label="Upload de transações">
          <UploadForm onUpload={handleUpload} isLoading={isUploading} />
        </section>

        {hasData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="lg:col-span-1" aria-label="Gráfico de despesas">
              <ExpenseChart data={chartData} />
            </section>
            <section className="lg:col-span-2" aria-label="Lista de transações">
              <TransactionList transactions={transactions} />
            </section>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-slate-300 rounded-2xl p-16 flex flex-col items-center justify-center text-center bg-white shadow-sm transition-all hover:border-indigo-300 hover:shadow-md group">
      
      <div className="relative w-16 h-16 mb-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
        <FileSpreadsheet 
          className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 transition-colors" 
          strokeWidth={1.5} 
        />
      </div>
      
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        Nenhuma transação encontrada
      </h3>
      
      <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
        Faça o upload do seu extrato bancário em formato <strong className="font-medium text-slate-700">CSV</strong> na área acima para iniciar a análise inteligente das suas finanças.
      </p>
    </div>
  );
}