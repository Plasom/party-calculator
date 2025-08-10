import { Blanket } from "@/components/templates/blanket";

export interface IAlertModal {
    id: string;
    isOpen: boolean;
    onAction: () => void;
    onCancel: () => void;
    title: string;
    message: string;
    colorTheme?: 'default' | 'delete';
    actionText?: string;
}

export interface IDeleteModal {
    id: string;
    isOpen: boolean;
    onDelete: () => void;
    onCancel: () => void;
    title: string;
    message: string;
}

export function AlertModal({ id, isOpen, onAction, onCancel, title, message, colorTheme='default', actionText }: IAlertModal) {
    if (!isOpen) return null;

    const colorThemeClass = {
        default: {
            textColor: 'text-[var(--color-black-tertiary)]',
        },
        delete: {
            textColor: 'text-[var(--components-button-ghost-desctructive-text)]',
        }
    }[colorTheme];

    return (
        <Blanket onClose={onCancel} itemAlignment="center" disableClose>
            <div id={id} className="w-[256px] bg-[var(--color-white)] rounded-xl">
                <div className="px-[8.5px] pt-4 pb-6">
                    <div className="px-4 flex flex-col items-center gap-1">
                        <p className="font-lg font-semibold">{title}</p>
                        <p className="font-xs text-[#AAA] text-center">{message}</p>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[var(--color-grey-primary)]" />

                <div className="w-full flex flex-row">
                    <div
                        className="w-full font-semibold py-3 border-r-[0.5px] flex items-center justify-center text-[var(--components-button-quartiary-text)] cursor-pointer"
                        onClick={onCancel}
                    >
                        Cancel
                    </div>
                    <div
                        className={`w-full font-semibold py-3 border-l-[0.5px] flex items-center justify-center ${colorThemeClass.textColor} cursor-pointer`}
                        onClick={onAction}
                    >
                        {actionText || 'Confirm'}
                    </div>
                </div>
            </div>
        </Blanket>
    );
}

// confirm-modal

// delete-modal
export function DeleteModal({ isOpen, onDelete, onCancel, title, message }: IDeleteModal) {
    return (
        <AlertModal
            id="delete-confirmation"
            isOpen={isOpen}
            onAction={onDelete}
            onCancel={onCancel}
            title={title}
            message={message}
            colorTheme='delete'
            actionText="Delete"
        />
    );
}

// warning-modal