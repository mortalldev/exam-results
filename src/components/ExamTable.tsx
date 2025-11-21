import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Hash, Trash2, Check, X } from "lucide-react";
import { NumericFormat } from "react-number-format";
import type { Student, Column } from "@/types";

type ExamTableProps = {
    students: Student[];
    columns: Column[];
    finalScores: Record<string, number>;
    passThreshold: number | string;
    onUpdateName: (id: string, name: string) => void;
    onUpdateValue: (studentId: string, columnId: string, value: number | "") => void;
    onRemoveStudent: (id: string) => void;
    onRemoveColumn: (id: string) => void;
};

export function ExamTable({
    students,
    columns,
    finalScores,
    passThreshold,
    onUpdateName,
    onUpdateValue,
    onRemoveStudent,
    onRemoveColumn,
}: ExamTableProps) {

    return (
        <div className="overflow-x-auto border rounded-lg shadow-lg">
            <table className="w-full border-collapse">
                <thead className="bg-primary text-white">
                    <tr>
                        <th className="p-3 text-center border-r border-white/20 min-w-[60px]">
                            <Hash size={18} className="inline" />
                        </th>
                        <th className="p-3 text-left border-r border-white/20 min-w-[180px]">Ismi</th>

                        {columns.map(col => (
                            <th key={col.id} className="p-3 text-center border-r border-white/20 min-w-[120px] relative group">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="flex-1">{col.label}</span>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
                                        onClick={() => onRemoveColumn(col.id)}
                                        title="Ustunni o'chirish"
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                                <div className="text-xs font-normal opacity-80 mt-1">
                                    {col.type === "score" ? "(0-20)" : "(0-100)"}
                                </div>
                            </th>
                        ))}

                        <th className="p-3 text-center border-r border-white/20 min-w-[100px]">Yakuniy</th>
                        <th className="p-3 text-center border-r border-white/20 min-w-20">Holat</th>
                        <th className="p-3 text-center min-w-[60px]"></th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((s, idx) => {
                        const final = finalScores[s.id];
                        const passed =
                            final !== undefined &&
                            passThreshold !== "" &&
                            final >= Number(passThreshold);

                        return (
                            <tr
                                key={s.id}
                                className="border-b hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors"
                            >
                                <td className="p-3 text-center border-r font-medium">{idx + 1}</td>

                                <td className="p-3 border-r">
                                    <Input
                                        value={s.name}
                                        onChange={(e) => onUpdateName(s.id, e.target.value)}
                                        className="w-full"
                                    />
                                </td>

                                {columns.map(col => (
                                    <td key={col.id} className="p-3 border-r">
                                        <NumericFormat
                                            customInput={Input}
                                            value={s.data[col.id] === "" ? "" : s.data[col.id]}
                                            onValueChange={(values) => {
                                                const { floatValue } = values;
                                                onUpdateValue(s.id, col.id, floatValue === undefined ? "" : floatValue);
                                            }}
                                            allowNegative={false}
                                            decimalScale={col.type === "score" ? 1 : 0}
                                            isAllowed={(values) => {
                                                const { floatValue } = values;
                                                if (floatValue === undefined) return true;
                                                const max = col.type === "score" ? 20 : 100;
                                                return floatValue >= 0 && floatValue <= max;
                                            }}
                                            className="w-full text-center"
                                            placeholder="0"
                                        />
                                    </td>
                                ))}

                                <td className="p-3 text-center border-r font-semibold">
                                    {final !== undefined ? (
                                        <span className={final >= Number(passThreshold || 0) ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                                            {final}%
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>

                                <td className="p-3 text-center border-r">
                                    {final === undefined ? (
                                        <span className="text-gray-400">-</span>
                                    ) : passed ? (
                                        <Check className="text-green-500 inline" size={22} />
                                    ) : (
                                        <X className="text-red-500 inline" size={22} />
                                    )}
                                </td>

                                <td className="p-3 text-center">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600"
                                        onClick={() => onRemoveStudent(s.id)}
                                        title="O'quvchini o'chirish"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
