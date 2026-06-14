'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';

interface CartItem {
	id: string; // product id
	slug: string;
	name: string;
	image: string;
	volume_ml: number;
	price: number;
	quantity: number;
}

export default function BagRow({
	item,
	onQuantityChange,
	onRemove,
}: {
	item: CartItem;
	onQuantityChange: (id: string, volume_ml: number, qty: number) => void;
	onRemove: (id: string, volume_ml: number) => void;
}) {
	return (
		<div className="flex gap-5 py-7 border-b border-[#211911]/8 group">
			{/* Image */}
			<Link href={`/perfume/${item.slug}`} className="flex-shrink-0">
				<div className="relative w-[100px] h-[120px] bg-[#ede5d8] overflow-hidden">
					<Image
						src={item.image}
						alt={item.name}
						fill
						
						className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
					/>
				</div>
			</Link>

			{/* Details */}
			<div className="flex-1 min-w-0 flex flex-col justify-between">
				<div>
					<Link
						href={`/perfume/${item.slug}`}
						className="text-xl font-bold  leading-snug text-[#211911] hover:text-[#b36619]
                      transition-colors duration-300 no-underline block mb-1"
						style={{ fontFamily: "'Cormorant Garamond', serif" }}
					>
						{item.name}
					</Link>
					<p className="text-sm text-[#211911]/40 font-medium">
						{item.volume_ml} ml
					</p>
				</div>

				{/* Quantity row */}
				<div className="flex items-center gap-4 mt-4">
					<div className="flex items-center border border-[#211911]/15">
						<button
							onClick={() =>
								item.quantity <= 1
									? onRemove(item.id, item.volume_ml)
									: onQuantityChange(
											item.id,
											item.volume_ml,
											item.quantity - 1,
										)
							}
							className="w-8 h-8 flex items-center justify-center text-[#211911]/40 hover:text-[#211911] hover:bg-black/4 transition-all duration-150 select-none"
						>
							<Minus className="w-4 h-4" />
						</button>
						<span
							className="w-9 h-8 flex items-center justify-center text-sm font-semibold
                            border-x border-[#211911]/15 text-[#211911] select-none"
						>
							{item.quantity}
						</span>
						<button
							onClick={() =>
								onQuantityChange(
									item.id,
									item.volume_ml,
									item.quantity + 1,
								)
							}
							disabled={item.quantity >= 10}
							className="w-8 h-8 flex items-center justify-center text-[#211911]/40
                         hover:text-[#211911] hover:bg-black/4 transition-all duration-150
                         disabled:opacity-25 disabled:cursor-not-allowed select-none"
						>
							<Plus className="w-4 h-4" />
						</button>
					</div>

					<button
						onClick={() => onRemove(item.id, item.volume_ml)}
						className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#211911]/25
                       hover:text-red-400 transition-colors duration-200"
					>
						Remove
					</button>
				</div>
			</div>

			{/* Price */}
			<div className="flex-shrink-0 flex flex-col items-end justify-between">
				<span className="text-lg font-bold text-[#211911] tracking-tight">
					₹{item.price * item.quantity}
				</span>
				{item.quantity > 1 && (
					<span className="text-sm text-[#211911]/30">
						₹{item.price} each
					</span>
				)}
			</div>
		</div>
	);
}