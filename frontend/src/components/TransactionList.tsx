import { Transaction  } from "@/types/transaction";

interface Props {
    transaction: Transaction[];
}

export function TransactionList({ transaction }: Props) {
    return (
        <div className="bg-white rounded-x1 shadow-sm p-6">
            <table className="w-full">
                <thead>
                    <tr className="text-left border-b">
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {transaction.map((transaction, index) => (
                        <tr key={index} className="border-b">
                            <td className="py-3">{transaction.description}</td>
                            <td>{transaction.category}</td>
                            <td>R$ {transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}