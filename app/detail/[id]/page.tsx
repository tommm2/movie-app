interface DetailProps {
	params: { id: number };
}

export default function Detail({ params }: DetailProps) {
	return (
		<main>
			<h1 className='mb-4 text-2xl font-bold'>Discover your Movie</h1>
			{params.id}
		</main>
	)
}
