'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { Button } from "@/components/ui/button";

export default function SushiroPage() {
    return (
        <PageWithNav>
            <Section header="Who's eating?" description="Add members to track their dishes.">
                <Button
                    type="primary"
                    size="sm"
                    leftIcon="add"
                    label="Add Member"
                    onClick={() => console.log('Add Member Clicked')}
                    fontSize="font-semibold"/>
            </Section>
        </PageWithNav>
    )
}