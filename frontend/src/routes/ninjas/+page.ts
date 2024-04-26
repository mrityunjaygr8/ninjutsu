import useGetNinjas from '$lib/fetchers/useGetNinjas';
import type { Paginated } from '$lib/types/paginated';
import type { Village } from '$lib/types/villages';
export async function load({ parent, fetch }) {
	const { queryClient } = await parent();
	// You need to use the SvelteKit fetch function here
	await queryClient.prefetchQuery<Paginated<Village>, Error>(useGetNinjas);
}
