'use server';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

export const getMovies = async (page = 1, limit = 10) => {
	try {
		const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
		const res = await fetch(url);

		const { results } = await res.json();

		const resultsWithLimit = results.slice(0, limit);

		return resultsWithLimit;
	} catch (error) {
		throw new Error(`An error happened: ${error}`)
	}
}

export const getMovieDetail = async (id: number) => {
	try {
		const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`;
		const res = await fetch(url);

		const result = await res.json();

		return result;
	} catch (error) {
		throw new Error(`An error happened: ${error}`)
	}
}
