'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export interface IMember {
    id: string;
    name: string;
}

interface IPathMembers {
    [path: string]: {
        members: IMember[];
        selectedMember: IMember | null;
    };
}

interface IMemberContext {
    members: IMember[];
    selectedMember: IMember | null;
    addMember: (name: string) => void;
    changeMemberName: (name: string) => void;
    selectMember: (memberId: string) => void;
    clearMembers: () => void;
    removeMember: (memberId: string) => void;
    clearAllMembers: () => void;
}

const MemberContext = createContext<IMemberContext | undefined>(undefined);

interface MemberProviderProps {
    children: ReactNode;
}

export function MemberProvider({ children }: MemberProviderProps) {
    const pathname = usePathname();
    const [pathMembers, setPathMembers] = useState<IPathMembers>({});

    const getBasePath = (path: string) => {
        if (path.startsWith('/sushiro')) return '/sushiro';
        if (path.startsWith('/teenoi')) return '/teenoi';
        return path;
    };

    const currentPath = getBasePath(pathname || '/');
    const currentData = pathMembers[currentPath] || { members: [], selectedMember: null };

    const addMember = (name: string) => {
        const names = name.split(',').map(n => n.trim()).filter(n => n.length > 0);

        setPathMembers(prev => {
            const current = prev[currentPath] || { members: [], selectedMember: null };
            
            const newMembers = names.map((memberName, index) => ({
                id: Date.now().toString() + index.toString(),
                name: memberName
            }));
            
            const updatedMembers = [...current.members, ...newMembers];
            
            const selectedMember = current.selectedMember || 
                (updatedMembers.length > 0 ? updatedMembers[0] : null);

            return {
                ...prev,
                [currentPath]: {
                    members: updatedMembers,
                    selectedMember,
                }
            };
        });
    };

    const changeMemberName = (name: string) => {
        if (!currentData.selectedMember) return;

        setPathMembers(prev => {
            const current = prev[currentPath] || { members: [], selectedMember: null };
            const updatedMembers = current.members.map(member => {
                if (member.id === currentData.selectedMember?.id) {
                    return { ...member, name };
                }
                return member;
            });

            return {
                ...prev,
                [currentPath]: {
                    members: updatedMembers,
                    selectedMember: updatedMembers.find(m => m.id === currentData.selectedMember?.id) || null,
                }
            };
        });
    };

    const selectMember = (memberId: string) => {
        if (currentData.selectedMember?.id === memberId) return;

        const member = currentData.members.find(m => m.id === memberId);
        
        setPathMembers(prev => ({
            ...prev,
            [currentPath]: {
                ...currentData,
                selectedMember: member || null,
            }
        }));
    };

    const clearMembers = () => {
        setPathMembers(prev => ({
            ...prev,
            [currentPath]: {
                members: [],
                selectedMember: null,
            }
        }));
    };

    const clearAllMembers = () => {
        setPathMembers({});
    };

    const removeMember = (memberId: string) => {
        setPathMembers(prev => {
            const current = prev[currentPath] || { members: [], selectedMember: null };
            const updatedMembers = current.members.filter(member => member.id !== memberId);
            
            const selectedMember = current.selectedMember?.id === memberId
                ? (updatedMembers.length > 0 ? updatedMembers[0] : null)
                : current.selectedMember;

            return {
                ...prev,
                [currentPath]: {
                    members: updatedMembers,
                    selectedMember,
                }
            };
        });
    };

    return (
        <MemberContext.Provider value={{
            members: currentData.members,
            selectedMember: currentData.selectedMember,
            addMember,
            changeMemberName,
            selectMember,
            clearMembers,
            removeMember,
            clearAllMembers,
        }}>
            {children}
        </MemberContext.Provider>
    );
}

export function useMember() {
    const context = useContext(MemberContext);
    if (context === undefined) {
        throw new Error('useMember must be used within a MemberProvider');
    }
    return context;
}
