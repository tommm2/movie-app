import { ArrowUp } from 'lucide-react';
import React from 'react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { OrderBy, SortBy, SortOption } from '@/types/sort';

import { Button } from './ui/button';

const defaultSortsOptions: SortOption[] = [
	{ label: 'popularity', value: 'popularity' },
	{ label: 'vote average', value: 'vote_average' },
	{ label: 'release date', value: 'release_date' },
];

interface SortControlProps {
	className?: string;
	sortsOptions?: SortOption[];
	orderBy: OrderBy;
	onOrderBy: (value: OrderBy) => void;
	sortBy: SortBy;
	onSortBy: (value: SortBy) => void;
}

export default function SortControl({
	className,
	sortsOptions = defaultSortsOptions,
	orderBy,
	onOrderBy,
	sortBy,
	onSortBy,
}: SortControlProps) {
	return (
		<div className='mb-4 flex items-center justify-end gap-4'>
			{orderBy && (
				<Button
					size='icon'
					variant='outline'
					className='px-2'
				>
					<ArrowUp
						className={cn('size-4', sortBy === 'desc' && 'rotate-180')}
						onClick={() => onSortBy(sortBy === 'desc' ? 'asc' : 'desc')}
					/>
				</Button>
			)}

			<Select onValueChange={onOrderBy}>
				<SelectTrigger className={cn('w-[180px]', className)}>
					<SelectValue placeholder='Order by' />
				</SelectTrigger>
				<SelectContent>
					{sortsOptions.map((option) => (
						<SelectItem
							key={option.value}
							value={option.value}
						>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
