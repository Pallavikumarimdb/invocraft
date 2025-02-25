'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Invoice } from "../../types/invoice";
import { InvoiceTemplate } from "../components/InvoiceTemplate";
import { InvoiceDialog } from "../components/InvoiceDialog";
import apiClient from "@/services/apiClient";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Edit2 } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function InvoiceDetails() {
    const router = useRouter();
    const { id } = useParams();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const fetchInvoice = async () => {
            if (!id) return;
            try {
                const response = await apiClient.get(`/invoices/${id}`);
                setInvoice(response.data);
            } catch (error) {
                console.error("Error fetching invoice:", error);
            }
        };

        fetchInvoice();
    }, [id]);

    const handleSaveInvoice = async (updatedInvoice: Invoice) => {
        try {
            const response = await apiClient.put(`/invoices/${id}`, updatedInvoice);
            setInvoice(response.data);
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Error updating invoice:", error);
        }
    };

    const handleDeleteInvoice = async (invoiceId: string) => {
        try {
            await apiClient.delete(`/invoices/${invoiceId}`);
            router.push("/dashboard/invoices"); 
        } catch (error) {
            console.error("Error deleting invoice:", error);
        }
    };

    if (!invoice) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container mb-6 mx-auto">
             <Navbar />
            <div className="flex ml-auto justify-between items-center mb-10">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Invoices
                </Button>
                <Button onClick={() => setIsDialogOpen(true)}>
                <Edit2 className="h-4 w-4 mr-2" />
                    Edit Invoice
                </Button>
            </div>

            <InvoiceTemplate invoice={invoice} />

            <InvoiceDialog
                invoice={invoice}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSave={handleSaveInvoice}
                onDelete={handleDeleteInvoice}
            />
        </div>
    );
}