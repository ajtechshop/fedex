/**
 * Design: Swiss Modernism meets Digital Utility
 * Compact parcel card with edit/delete actions
 * Monospace typography for dimensional precision
 */

import { Shipment } from "@/types/shipment";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2, Package } from "lucide-react";

interface ShipmentCardProps {
  shipment: Shipment;
  onEdit: (shipment: Shipment) => void;
  onDelete: (id: string) => void;
}

export function ShipmentCard({ shipment, onEdit, onDelete }: ShipmentCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow duration-150">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-primary">
          <Package className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-foreground truncate">
            {shipment.company}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {shipment.attention}
          </div>
          <div className="text-xs text-muted-foreground mt-1 truncate">
            {shipment.city}, {shipment.state} {shipment.zipcode}
          </div>
          
          <div className="flex items-center gap-3 mt-2 text-xs font-mono text-foreground">
            <span className="flex items-center gap-1">
              <span className="text-muted-foreground">L×W×H:</span>
              <span className="font-medium">{shipment.length}×{shipment.width}×{shipment.height}"</span>
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1">
              <span className="text-muted-foreground">Weight:</span>
              <span className="font-medium">{shipment.weight} lb</span>
            </span>
          </div>
        </div>
        
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => onEdit(shipment)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(shipment.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
