import { useCallback } from "react";
import * as XLSX from "xlsx";
import type { Student, Column } from "@/types";

export function useExcelExport() {
    const exportToExcel = useCallback(
        (
            students: Student[],
            columns: Column[],
            finalScores: Record<string, number>,
            passThreshold: number | string
        ) => {
            const exportData = students.map((student, idx) => {
                const row: any = {
                    "№": idx + 1,
                    "Ismi": student.name,
                };

                columns.forEach(col => {
                    const value = student.data[col.id];
                    row[col.label] = value === "" ? 0 : value;
                });

                const final = finalScores[student.id];
                row["Yakuniy (%)"] = final !== undefined ? final : "-";

                const passed =
                    final !== undefined &&
                    passThreshold !== "" &&
                    final >= Number(passThreshold);
                row["Holat"] = final === undefined ? "-" : passed ? "O'tdi" : "O'tmadi";

                return row;
            });

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(exportData);

            const colWidths = [
                { wch: 5 },
                { wch: 20 },
                ...columns.map(() => ({ wch: 15 })),
                { wch: 12 },
                { wch: 10 },
            ];
            ws["!cols"] = colWidths;

            XLSX.utils.book_append_sheet(wb, ws, "Natijalar");

            const fileName = `Exam_Results_${new Date().toLocaleDateString('uz-UZ').replace(/\./g, '-')}.xlsx`;
            XLSX.writeFile(wb, fileName);
        },
        []
    );

    return { exportToExcel };
}
