'use client';

import { Transaction } from "@/types/transaction";

interface Props {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-zinc-100">
        <h2 className="text-lg font-semibold text-zinc-900">Histórico</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-zinc-500 uppercase bg-zinc-50/50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">Descrição</th>
              <th scope="col" className="px-6 py-4 font-medium">Categoria</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-zinc-900">
                  {t.description}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800">
                    {t.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <span
                    className={
                      t.amount < 0 ? 'text-rose-600 font-medium' : 'text-emerald-600 font-medium'
                    }
                  >
                    {t.amount > 0 ? '+' : ''}{formatCurrency(t.amount)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}