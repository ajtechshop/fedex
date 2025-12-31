import { Shipment } from "@/types/shipment";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface ShipmentCardProps {
  shipment: Shipment;
  onEdit: (shipment: Shipment) => void;
  onDelete: (id: string) => void;
}

export function ShipmentCard({ shipment, onEdit, onDelete }: ShipmentCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-4 glass-card group relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
            <Package className="w-5 h-5 text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="font-bold text-lg text-foreground tracking-tight">
                {shipment.length} × {shipment.width} × {shipment.height}
                <span className="text-sm font-normal text-muted-foreground ml-1">in</span>
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 bg-accent/10 text-accent rounded-full uppercase tracking-wider">
                {shipment.weight} lb
              </span>
            </div>
          </div>

          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit(shipment)}
              className="h-8 w-8 p-0 rounded-lg"
            >
              <Pencil className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(shipment.id)}
              className="h-8 w-8 p-0 rounded-lg hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
