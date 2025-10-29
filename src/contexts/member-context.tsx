'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
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
    members: IMember[]; // members in current path
    selectedMember: IMember | null; // selected member in current path
    addMember: (name: string) => void; // add member to current path
    changeMemberName: (name: string) => void; // change name of member that is currently selected
    selectMember: (memberId: string) => void; // select member in current path
    clearMembers: () => void; // clear all members in current path
    removeMember: (memberId: string) => void; // remove member from current path
    clearAllMembers: () => void; // clear all member (all path)
}

const MemberContext = createContext<IMemberContext | undefined>(undefined);

interface MemberProviderProps {
    children: ReactNode;
}

export function MemberProvider({ children }: MemberProviderProps) {
    const pathname = usePathname();
    const [pathMembers, setPathMembers] = useState<IPathMembers>({});

    const getBasePath = (path: string) => {
        // Remove locale prefix (e.g., /en or /th) if present
        const pathWithoutLocale = path.replace(/^\/(en|th)/, '');
        
        if (pathWithoutLocale.startsWith('/sushiro')) return '/sushiro';
        if (pathWithoutLocale.startsWith('/teenoi')) return '/teenoi';
        return pathWithoutLocale || path;
    };

    const currentPath = getBasePath(pathname || '/');
    const currentData = useMemo(() => pathMembers[currentPath] || { members: [], selectedMember: null }, [pathMembers, currentPath]);

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
