/**
 * Design: Swiss Modernism meets Digital Utility
 * Asymmetric two-column layout: sidebar (shipment list) + main panel (form)
 * Simplified for internal use with only essential fields
 */

import { useState } from "react";
import { nanoid } from "nanoid";
import { Shipment, ShipmentFormData } from "@/types/shipment";
import { ShipmentCard } from "@/components/ShipmentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { generateCSV, downloadCSV } from "@/lib/csv";
import { toast } from "sonner";
import { Download, Plus, Package, FileText } from "lucide-react";

export default function Home() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<ShipmentFormData>({
    name: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    reference: "",
    residential: false,
  });

  const handleInputChange = (field: keyof ShipmentFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const required = [
      "name", "street1", "city", "state", 
      "zipcode", "phone", "length", "width", "height", "weight"
    ];
    
    for (const field of required) {
      if (!formData[field as keyof ShipmentFormData]) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    // Validate dimensions and weight are numbers
    const length = parseFloat(formData.length);
    const width = parseFloat(formData.width);
    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);
    
    if (isNaN(length) || isNaN(width) || isNaN(height) || isNaN(weight)) {
      toast.error("Dimensions and weight must be valid numbers");
      return false;
    }
    
    if (length <= 0 || width <= 0 || height <= 0 || weight <= 0) {
      toast.error("Dimensions and weight must be greater than zero");
      return false;
    }
    
    return true;
  };

  const handleAddShipment = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    const newShipment: Shipment = {
      id: editingId || nanoid(),
      name: formData.name,
      street1: formData.street1,
      street2: formData.street2 || undefined,
      city: formData.city,
      state: formData.state,
      zipcode: formData.zipcode,
      phone: formData.phone,
      length: Math.ceil(parseFloat(formData.length)),
      width: Math.ceil(parseFloat(formData.width)),
      height: Math.ceil(parseFloat(formData.height)),
      weight: parseFloat(formData.weight),
      reference: formData.reference,
      residential: formData.residential,
    };
    
    if (editingId) {
      setShipments(prev => prev.map(s => s.id === editingId ? newShipment : s));
      toast.success("Parcel updated");
      setEditingId(null);
    } else {
      setShipments(prev => [...prev, newShipment]);
      toast.success("Parcel added");
    }
    
    // Reset form
    setFormData({
      name: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipcode: "",
      phone: "",
      length: "",
      width: "",
      height: "",
      weight: "",
      reference: "",
      residential: false,
    });
  };

  const handleEdit = (shipment: Shipment) => {
    setFormData({
      name: shipment.name,
      street1: shipment.street1,
      street2: shipment.street2 || "",
      city: shipment.city,
      state: shipment.state,
      zipcode: shipment.zipcode,
      phone: shipment.phone,
      length: shipment.length.toString(),
      width: shipment.width.toString(),
      height: shipment.height.toString(),
      weight: shipment.weight.toString(),
      reference: shipment.reference,
      residential: shipment.residential,
    });
    setEditingId(shipment.id);
    toast.info("Editing parcel");
  };

  const handleDelete = (id: string) => {
    setShipments(prev => prev.filter(s => s.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
    toast.success("Parcel removed");
  };

  const handleGenerateCSV = () => {
    if (shipments.length === 0) {
      toast.error("Add at least one parcel to generate CSV");
      return;
    }
    
    const csv = generateCSV(shipments);
    const timestamp = new Date().toISOString().split('T')[0];
    downloadCSV(csv, `fedex_shipments_${timestamp}.csv`);
    toast.success(`CSV file downloaded with ${shipments.length} shipment${shipments.length > 1 ? 's' : ''}`);
  };

  const handleClearAll = () => {
    if (shipments.length === 0) return;
    
    if (confirm(`Clear all ${shipments.length} parcel${shipments.length > 1 ? 's' : ''}?`)) {
      setShipments([]);
      setEditingId(null);
      toast.success("All parcels cleared");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">FedEx Shipment CSV Generator</h1>
              <p className="text-sm text-muted-foreground mt-1">Quick shipment entry for internal batch processing</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Asymmetric Two-Column Layout */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Shipment List */}
          <aside className="lg:col-span-4 space-y-4">
            <Card className="p-4 bg-sidebar border-sidebar-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">Parcels</h2>
                  <span className="text-xs font-mono text-muted-foreground">
                    ({shipments.length})
                  </span>
                </div>
                {shipments.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAll}
                    className="text-xs text-muted-foreground hover:text-destructive"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              
              {shipments.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No parcels added yet</p>
                  <p className="text-xs mt-1">Fill the form to add your first shipment</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {shipments.map((shipment) => (
                    <ShipmentCard
                      key={shipment.id}
                      shipment={shipment}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
              
              {shipments.length > 0 && (
                <Button
                  onClick={handleGenerateCSV}
                  className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generate CSV ({shipments.length} parcel{shipments.length > 1 ? 's' : ''})
                </Button>
              )}
            </Card>
          </aside>

          {/* Right Panel - Input Form */}
          <main className="lg:col-span-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                {editingId ? "Edit Parcel" : "Add New Parcel"}
              </h2>
              
              <form onSubmit={handleAddShipment} className="space-y-6">
                {/* Recipient Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Recipient
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Recipient Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="street1">Street Address *</Label>
                    <Input
                      id="street1"
                      value={formData.street1}
                      onChange={(e) => handleInputChange("street1", e.target.value)}
                      placeholder="123 Main Street"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="street2">Address Line 2</Label>
                    <Input
                      id="street2"
                      value={formData.street2}
                      onChange={(e) => handleInputChange("street2", e.target.value)}
                      placeholder="Suite 100"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="New York"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value.toUpperCase())}
                        placeholder="NY"
                        maxLength={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zipcode">ZIP Code *</Label>
                      <Input
                        id="zipcode"
                        value={formData.zipcode}
                        onChange={(e) => handleInputChange("zipcode", e.target.value)}
                        placeholder="10001"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="2125551234"
                    />
                    <p className="text-xs text-muted-foreground">Numbers only, no special characters</p>
                  </div>
                </div>

                {/* Package Dimensions */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Package Dimensions
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="length">Length (in) *</Label>
                      <Input
                        id="length"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.length}
                        onChange={(e) => handleInputChange("length", e.target.value)}
                        placeholder="12"
                        className="font-mono"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="width">Width (in) *</Label>
                      <Input
                        id="width"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.width}
                        onChange={(e) => handleInputChange("width", e.target.value)}
                        placeholder="8"
                        className="font-mono"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (in) *</Label>
                      <Input
                        id="height"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.height}
                        onChange={(e) => handleInputChange("height", e.target.value)}
                        placeholder="6"
                        className="font-mono"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (lb) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                      placeholder="5.5"
                      className="font-mono max-w-xs"
                    />
                  </div>
                </div>

                {/* Reference & Options */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Additional Info
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reference">INV# / SO#</Label>
                    <Input
                      id="reference"
                      value={formData.reference}
                      onChange={(e) => handleInputChange("reference", e.target.value)}
                      placeholder="INV-12345 or SO-67890"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="residential"
                      checked={formData.residential}
                      onCheckedChange={(checked) => handleInputChange("residential", checked as boolean)}
                    />
                    <Label
                      htmlFor="residential"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Residential delivery
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {editingId ? "Update Parcel" : "Add Parcel"}
                  </Button>
                  
                  {editingId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingId(null);
                        setFormData({
                          name: "",
                          street1: "",
                          street2: "",
                          city: "",
                          state: "",
                          zipcode: "",
                          phone: "",
                          length: "",
                          width: "",
                          height: "",
                          weight: "",
                          reference: "",
                          residential: false,
                        });
                        toast.info("Editing cancelled");
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
