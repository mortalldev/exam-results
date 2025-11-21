import { useReducer } from "react";
import type { ExamState, ExamAction } from "@/types";

const initialState: ExamState = {
    students: [
        { id: crypto.randomUUID(), name: "Student 1", data: {} },
    ],
    columns: [
        { id: "test", label: "Test", type: "score" },
        { id: "amaliyot", label: "Amaliyot", type: "percent" },
    ],
    finalScores: {},
    passThreshold: 70,
};

function examReducer(state: ExamState, action: ExamAction): ExamState {
    switch (action.type) {
        case "ADD_STUDENT":
            return {
                ...state,
                students: [
                    ...state.students,
                    {
                        id: crypto.randomUUID(),
                        name: `Student ${state.students.length + 1}`,
                        data: {},
                    },
                ],
            };

        case "REMOVE_STUDENT": {
            const newFinalScores = { ...state.finalScores };
            delete newFinalScores[action.payload];
            return {
                ...state,
                students: state.students.filter(s => s.id !== action.payload),
                finalScores: newFinalScores,
            };
        }

        case "UPDATE_STUDENT_NAME":
            return {
                ...state,
                students: state.students.map(s =>
                    s.id === action.payload.id ? { ...s, name: action.payload.name } : s
                ),
            };

        case "UPDATE_STUDENT_VALUE":
            return {
                ...state,
                students: state.students.map(s =>
                    s.id === action.payload.studentId
                        ? { ...s, data: { ...s.data, [action.payload.columnId]: action.payload.value } }
                        : s
                ),
            };

        case "ADD_COLUMN":
            return {
                ...state,
                columns: [...state.columns, action.payload],
                students: state.students.map(s => ({
                    ...s,
                    data: { ...s.data, [action.payload.id]: "" },
                })),
            };

        case "REMOVE_COLUMN":
            return {
                ...state,
                columns: state.columns.filter(c => c.id !== action.payload),
                students: state.students.map(s => {
                    const newData = { ...s.data };
                    delete newData[action.payload];
                    return { ...s, data: newData };
                }),
            };

        case "SET_FINAL_SCORES":
            return {
                ...state,
                finalScores: action.payload,
            };

        case "SET_PASS_THRESHOLD":
            return {
                ...state,
                passThreshold: action.payload,
            };

        default:
            return state;
    }
}

export function useExamReducer() {
    return useReducer(examReducer, initialState);
}
