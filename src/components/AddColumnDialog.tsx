import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

type AddColumnDialogProps = {
    onAddColumn: (label: string, type: "score" | "percent") => void;
};

export function AddColumnDialog({ onAddColumn }: AddColumnDialogProps) {
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState("");
    const [type, setType] = useState<"score" | "percent">("percent");

    const handleAdd = () => {
        if (!label.trim()) {
            alert("Nomi bo'sh bo'lishi mumkin emas");
            return;
        }
        onAddColumn(label, type);
        setLabel("");
        setType("percent");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus size={18} />
                    Mashq qo'shish
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Yangi mashq qo'shish</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-2">Mashq nomi</label>
                        <Input
                            placeholder="Masalan: Test, Amaliyot..."
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-2">Turi</label>
                        <Select value={type} onValueChange={(v) => setType(v as any)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="score">Ball (0–20)</SelectItem>
                                <SelectItem value="percent">Foiz (0–100)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={handleAdd}>Qo'shish</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
