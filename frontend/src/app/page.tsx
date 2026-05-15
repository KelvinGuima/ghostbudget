'use client';

import { useMemo, useState } from 'react';
import { UploadForm } from '@/components/UploadForm';
import { TransactionList } from '@/components/TransactionList';
import { ExpenseChart } from '@/components/ExpenseChart';
import { api } from '@/services/api';
import { Transaction } from '@/types/transaction';

export default function Home() {
  const [transactions, setTransaction] = useState<Transaction[]>([]);

  async function handleUpload(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    const response = await api.post('/upload', formData);

    setTransaction(response.data);

  }

  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};

    transactions.forEach((transactions) => {
      grouped[transactions.category] =
        (grouped[transactions.category] || 0) +
        Math.abs(transactions.amount);
    });

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  return (
    <main className="min-h-screen bg-zinc-100 p-10">
      <div className="max-w-6x1 mx-auto space-y-6">
        <h1 className="text-4x1 font-bold">
          GhostBudget
        </h1>
        <UploadForm onUpload={handleUpload} />
        <ExpenseChart data={chartData} />
        <TransactionList transaction={transactions} />
      </div>
    </main>
  );
}