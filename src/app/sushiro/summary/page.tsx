'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { useMember } from "@/contexts/member-context";
import Link from "next/link";

export default function SushiroSummaryPage() {
    const { members, selectedMember, clearMembers } = useMember();

    const selectedMemberData = members.find(m => m.id === selectedMember?.id);

    return (
        <PageWithNav>
            <Section header="🍣 Sushiro Summary" description="Review your sushi order" className="pt-4">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Link 
                            href="/sushiro"
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            ← Back to Sushiro
                        </Link>
                        <button 
                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                            onClick={clearMembers}
                        >
                            Clear Members
                        </button>
                    </div>

                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2 text-red-800">Current Order</h3>
                        {selectedMemberData ? (
                            <p className="text-red-700">Ordering for: <span className="font-medium">{selectedMemberData.name}</span></p>
                        ) : (
                            <p className="text-red-600">No member selected</p>
                        )}
                    </div>
                    
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2 text-red-800">All Members ({members.length})</h3>
                        {members.length > 0 ? (
                            <div className="space-y-2">
                                {members.map(member => (
                                    <div key={member.id} className={`p-2 rounded ${
                                        member.id === selectedMember?.id
                                            ? 'bg-red-200 text-red-900 border border-red-300' 
                                            : 'bg-white text-red-700 border border-red-200'
                                    }`}>
                                        {member.name} {member.id === selectedMember?.id && '(Selected)'}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-red-600">No members added yet</p>
                        )}
                    </div>
                </div>
            </Section>
        </PageWithNav>
    );
}
