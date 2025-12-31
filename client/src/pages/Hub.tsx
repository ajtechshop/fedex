import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Package, ChevronRight, LayoutGrid, ShieldCheck, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

/**
 * AJ TECH Utility Hub
 * 
 * This is the central entry point for all AJ TECH internal utilities.
 * It uses a card-based layout with Framer Motion animations to provide
 * a premium, cohesive portal for employees.
 * 
 * ADDING NEW UTILITIES:
 * 1. Create your new page component in `client/src/pages/`.
 * 2. Add the utility metadata to the `utilities` array below.
 * 3. Register the route in `App.tsx`.
 */

export default function Hub() {
    const utilities = [
        {
            id: "fedex",
            title: "Shipment Management",
            description: "Generate perfectly formatted FedEx CSV manifests with real-time volume and weight tracking.",
            icon: <Package className="w-8 h-8 text-primary" />,
            path: "/fedex",
            status: "Active",
            color: "from-blue-500/10 to-indigo-500/10"
        },
        {
            id: "inventory",
            title: "Inventory Control",
            description: "Next-generation inventory tracking system. Currently in development.",
            icon: <LayoutGrid className="w-8 h-8 text-muted-foreground" />,
            path: "#",
            status: "Coming Soon",
            color: "from-gray-500/5 to-gray-500/10"
        }
    ];

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
            {/* Header */}
            <header className="pt-20 pb-12 text-center space-y-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-center mb-4"
                >
                    <img
                        src="https://www.ajtech.shop/web/image/website/1/logo/AJ%20TECH?unique=0d0ff7c"
                        alt="AJ TECH Logo"
                        className="h-24 lg:h-32 w-auto object-contain drop-shadow-xl"
                    />
                </motion.div>
                <div className="space-y-2">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl lg:text-7xl font-black tracking-tighter text-foreground"
                    >
                        Utility <span className="text-primary">Hub</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg lg:text-xl font-medium tracking-tight"
                    >
                        Enterprise Logistics & Operations Suite
                    </motion.p>
                </div>
            </header>

            <main className="container max-w-6xl py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {utilities.map((util, index) => (
                        <motion.div
                            key={util.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                        >
                            <Link href={util.path}>
                                <Card className={`group relative overflow-hidden p-8 h-full border-2 border-divider hover:border-primary/30 transition-all duration-500 cursor-pointer glass hover:shadow-2xl hover:shadow-primary/10`}>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${util.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <div className="relative z-10 flex flex-col h-full space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div className="p-4 bg-background rounded-2xl shadow-inner border border-divider">
                                                {util.icon}
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${util.status === 'Active'
                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                : 'bg-muted text-muted-foreground border-divider'
                                                }`}>
                                                {util.status}
                                            </span>
                                        </div>

                                        <div className="space-y-2 flex-grow">
                                            <h2 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-2">
                                                {util.title}
                                                <ChevronRight className="w-6 h-6 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            </h2>
                                            <p className="text-muted-foreground font-medium leading-relaxed">
                                                {util.description}
                                            </p>
                                        </div>

                                        <div className="pt-4 flex items-center gap-4 text-xs font-bold text-muted-foreground/60">
                                            <div className="flex items-center gap-1">
                                                <ShieldCheck className="w-3 h-3" />
                                                AJ TECH Internal
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Zap className="w-3 h-3" />
                                                SSO Ready
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-12 text-center">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                    © 2025 AJ TECH • Engineering Excellence
                </p>
            </footer>
        </div>
    );
}
