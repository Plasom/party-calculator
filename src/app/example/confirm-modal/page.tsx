'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { DeleteModal } from "@/components/ui/modal/alert-modal";

export default function ConfirmModalPage() {
    return (
        <PageWithNav>
            <DeleteModal
                isOpen={true}
                onDelete={() => console.log("Confirmed")}
                onCancel={() => console.log("Cancelled")}
                title="Delete Confirmation"
                message="Are you sure you want to delete this item?"
            />
        </PageWithNav>
    )
}