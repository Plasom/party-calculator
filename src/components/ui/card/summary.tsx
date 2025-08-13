import { IconButton } from "../icon-button";
import { MemberBadge } from "../member-badge";
import { ShowMemberBadge } from "../show-member-badge";

export function CardSummary(){
    return (
        <div className="flex bg-[var(--components-card-primary-bg)] border-[var(--components-card-primary-border)] rounded-[var(--components-card-shared-border)] border-1 p-4 w-full ">
            <div className="flex flex-col justify-between gap-4 ">
                <div className=" gap-1">
                <div className="flex flex-row justify-between">
                    <p className="text-sm font-medium">🍽️ Plate 40฿</p>
                    <p className="text-sm font-normal">x2 (80.00฿) </p>
                </div>
                <div>
                    <p className="text-sm font-normal text-[var(--color-grey-tertiary)]">👥 Split between 2 (฿20.00/each)</p>
                </div>
                </div>
                <div className="px-4 gap-1 flex flex-row flex-wrap ">
                    <ShowMemberBadge
                        memberName="ming"
                    />
                    <ShowMemberBadge
                        memberName="phum"
                    />
                    <ShowMemberBadge
                        memberName="bam"
                    />
                </div>
            </div>
            <div>
                <IconButton
                    icon="edit"
                    onClick={() => console.log("Edit clicked")}
                    
                />
            </div>
        </div>
    );
}