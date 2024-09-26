'use server';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

export const getMovies = async (page = 1, limit = 10) => {
	try {
		const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
		const res = await fetch(url);
		const { results } = await res.json();

		return results.slice(0, limit);
	} catch (error) {
		throw new Error(`An error happened: ${error}`);
	}
};

export const getMovieDetail = async (id: number) => {
	try {
		const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`;

		const res = await fetch(url);
		const data = await res.json();

		return data;
	} catch (error) {
		throw new Error(`An error happened: ${error}`);
	}
};

export const getSearchMovies = async (query: string, page = 1) => {
	try {
		const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
		const res = await fetch(url);
		const { results } = await res.json();

		return results;
	} catch (error) {
		throw new Error(`An error happened: ${error}`);
	}
};
