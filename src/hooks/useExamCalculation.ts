import { useCallback } from "react";
import type { Student, Column } from "@/types";

export function useExamCalculations() {
    const calculateFinalScores = useCallback(
        (students: Student[], columns: Column[]) => {

            const results: Record<string, number> = {};

            students.forEach(s => {
                const values = columns.map(col => {
                    const v = s.data[col.id];

                    const val =
                        v === "" || v === null || v === undefined || typeof v === "object"
                            ? 0
                            : Number(v);

                    if (col.type === "score") return (val / 20) * 100;
                    return val;
                });



                const avg = values.length > 0
                    ? values.reduce((a, b) => a + b, 0) / values.length
                    : 0;
                results[s.id] = Number(avg.toFixed(1));
            });

            return results;
        },
        []
    );

    return { calculateFinalScores };
}
