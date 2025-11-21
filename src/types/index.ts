export type Column = {
    id: string;
    label: string;
    type: "percent" | "score";
};

export type Student = {
    id: string;
    name: string;
    data: Record<string, number | "">;
};

export type ExamState = {
    students: Student[];
    columns: Column[];
    finalScores: Record<string, number>;
    passThreshold: number | string;
};

export type ExamAction =
    | { type: "ADD_STUDENT" }
    | { type: "REMOVE_STUDENT"; payload: string }
    | { type: "UPDATE_STUDENT_NAME"; payload: { id: string; name: string } }
    | { type: "UPDATE_STUDENT_VALUE"; payload: { studentId: string; columnId: string; value: number | "" } }
    | { type: "ADD_COLUMN"; payload: Column }
    | { type: "REMOVE_COLUMN"; payload: string }
    | { type: "SET_FINAL_SCORES"; payload: Record<string, number> }
    | { type: "SET_PASS_THRESHOLD"; payload: number | string };
