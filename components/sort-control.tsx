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
import type { OrderBy, SortBy } from '@/types/sort';

interface SortControlProps {
	orderBy: OrderBy;
	onOrderBy: (value: OrderBy) => void;
	sortBy: SortBy;
	onSortBy: (value: SortBy) => void;
}

export default function SortControl({
	orderBy,
	onOrderBy,
	sortBy,
	onSortBy,
}: SortControlProps) {
	return (
		<div className='mb-4 flex items-center justify-end gap-4'>
			{orderBy && (
				<ArrowUp
					className={cn('cursor-pointer', sortBy === 'desc' && 'rotate-180')}
					onClick={() => onSortBy(sortBy === 'desc' ? 'asc' : 'desc')}
				/>
			)}

			<Select onValueChange={onOrderBy}>
				<SelectTrigger className='w-[180px]'>
					<SelectValue placeholder='Order by' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='popularity'>popularity</SelectItem>
					<SelectItem value='vote_average'>vote average</SelectItem>
					{/* <SelectItem value='release_date'>上映日期</SelectItem> */}
				</SelectContent>
			</Select>
		</div>
	);
}
