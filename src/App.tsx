import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Plus, Download } from "lucide-react";
import { NumericFormat } from "react-number-format";
import { useExamReducer } from "@/hooks/useExamReducer";
import { useExamCalculations } from "@/hooks/useExamCalculation";
import { useExcelExport } from "@/hooks/useExcelExport";
import { ExamTable } from "@/components/ExamTable";
import { AddColumnDialog } from "@/components/AddColumnDialog";

export default function App() {
  const [state, dispatch] = useExamReducer();

  const { calculateFinalScores } = useExamCalculations();
  const { exportToExcel } = useExcelExport();

  const handleAddStudent = useCallback(() => {
    dispatch({ type: "ADD_STUDENT" });
  }, [dispatch]);

  const handleRemoveStudent = useCallback((id: string) => {
    dispatch({ type: "REMOVE_STUDENT", payload: id });
  }, [dispatch]);

  const handleUpdateName = useCallback((id: string, name: string) => {
    dispatch({ type: "UPDATE_STUDENT_NAME", payload: { id, name } });
  }, [dispatch]);

  const handleUpdateValue = useCallback(
    (studentId: string, columnId: string, value: number | "") => {
      dispatch({ type: "UPDATE_STUDENT_VALUE", payload: { studentId, columnId, value } });
    },
    [dispatch]
  );

  const handleAddColumn = useCallback(
    (label: string, type: "score" | "percent") => {
      const id = label.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now();
      dispatch({ type: "ADD_COLUMN", payload: { id, label, type } });
    },
    [dispatch]
  );

  const handleRemoveColumn = useCallback((id: string) => {
    dispatch({ type: "REMOVE_COLUMN", payload: id });
  }, [dispatch]);

  const handleCalculate = useCallback(() => {
    const scores = calculateFinalScores(state.students, state.columns);
    dispatch({ type: "SET_FINAL_SCORES", payload: scores });
  }, [calculateFinalScores, state.students, state.columns, dispatch]);

  const handleExport = useCallback(() => {
    exportToExcel(state.students, state.columns, state.finalScores, state.passThreshold);
  }, [exportToExcel, state.students, state.columns, state.finalScores, state.passThreshold]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📊 Exam Results</h1>
        <ThemeToggle />
      </div>

      <div className="flex flex-wrap gap-3 mb-6 items-end">
        <Button onClick={handleAddStudent} className="gap-2">
          <Plus size={18} />
          O'quvchi qo'shish
        </Button>

        <AddColumnDialog onAddColumn={handleAddColumn} />

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">O'tish bali:</span>
          <NumericFormat
            customInput={Input}
            value={state.passThreshold}
            onValueChange={(values) => {
              const { floatValue } = values;
              dispatch({
                type: "SET_PASS_THRESHOLD",
                payload: floatValue === undefined ? "" : floatValue,
              });
            }}
            allowNegative={false}
            decimalScale={0}
            isAllowed={(values) => {
              const { floatValue } = values;
              if (floatValue === undefined) return true;
              return floatValue >= 0 && floatValue <= 100;
            }}
            className="w-20 text-center"
          />
          <span className="text-sm">%</span>
        </div>

        <Button onClick={handleCalculate} className="bg-primary gap-2">
          Hisoblash
        </Button>
      </div>

      <ExamTable
        students={state.students}
        columns={state.columns}
        finalScores={state.finalScores}
        passThreshold={state.passThreshold}
        onUpdateName={handleUpdateName}
        onUpdateValue={handleUpdateValue}
        onRemoveStudent={handleRemoveStudent}
        onRemoveColumn={handleRemoveColumn}
      />

      {state.students.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          O'quvchilar yo'q. "O'quvchi qo'shish" tugmasini bosing.
        </div>
      )}

      {state.students.length > 0 && (
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleExport}
            className="gap-2 bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            <Download size={20} />
            Excel ga yuklash
          </Button>
        </div>
      )}
    </div>
  );
}
