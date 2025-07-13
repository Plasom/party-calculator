'use client';

import { useState } from 'react';
import Image from 'next/image';

const minusIcon = "http://localhost:3845/assets/7181269824e6bd9146fd80df198254be86bbcbf8.svg";
const iconBg = "http://localhost:3845/assets/4bdcdd19b84d88e610bd92ebf635bbc30d5f6bda.svg";

interface QuantitySelectorProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export function QuantitySelector({ 
  initialValue = 0, 
  min = 0, 
  max = 99, 
  onChange 
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialValue);

  const handleDecrease = () => {
    if (quantity > min) {
      const newValue = quantity - 1;
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newValue = quantity + 1;
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= min && value <= max) {
      setQuantity(value);
      onChange?.(value);
    }
  };

  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative"
      data-name="quantity-selector"
    >
      {/* Decrease Button */}
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="bg-neutral-800 disabled:bg-gray-400 box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[4px] relative rounded-xl shrink-0 w-[54px] transition-colors hover:bg-neutral-700"
        data-name="decrease-button"
      >
        <div className="relative shrink-0 size-6" data-name="icon">
          <div
            className="absolute bottom-[45.833%] left-1/4 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-6px_-11px] mask-size-[24px_24px] right-1/4 top-[45.833%]"
            style={{ maskImage: `url('${minusIcon}')` }}
          >
            <Image 
              alt="Decrease" 
              className="block max-w-none size-full" 
              src={iconBg}
              width={24}
              height={24}
            />
          </div>
        </div>
      </button>

      {/* Increase Button */}
      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="bg-neutral-800 disabled:bg-gray-400 box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[4px] relative rounded-xl shrink-0 w-[54px] transition-colors hover:bg-neutral-700"
        data-name="increase-button"
      >
        <div className="relative shrink-0 size-6" data-name="icon">
          <div className="text-white text-lg font-semibold">+</div>
        </div>
      </button>

      {/* Quantity Input */}
      <div
        className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-[58px]"
        data-name="input"
      >
        <div className="basis-0 box-border content-stretch flex flex-col gap-1.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
          <div className="bg-neutral-50 relative rounded-lg shrink-0 w-full">
            <div className="absolute border border-gray-200 border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
            <div className="flex flex-row items-center relative size-full">
              <div className="box-border content-stretch flex flex-row items-center justify-start px-3 py-0.5 relative w-full">
                <input
                  type="number"
                  value={quantity}
                  onChange={handleInputChange}
                  min={min}
                  max={max}
                  className="basis-0 font-['Prompt:SemiBold',_sans-serif] grow min-h-px min-w-px not-italic bg-transparent border-none outline-none text-[18px] text-center text-neutral-800 leading-[28px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
