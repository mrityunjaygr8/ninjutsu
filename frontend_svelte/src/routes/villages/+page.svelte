<script lang="ts">
	import { writable } from 'svelte/store';
	import { createQuery } from '@tanstack/svelte-query';
	import useGetVillages from '$lib/fetchers/useGetVillages';
	import type { Paginated } from '$lib/types/paginated';
	import type { Village } from '$lib/types/villages';
	import { createSvelteTable, getCoreRowModel } from '@tanstack/svelte-table';
	import type { ColumnDef, TableOptions } from '@tanstack/svelte-table';
	import Table from '$lib/components/built/table.svelte';
	// This data is cached by prefetchQuery in +page.ts so no fetch actually happens here
	const query = createQuery<Paginated<Village>, Error>(useGetVillages);
	const defaultColumns: ColumnDef<Village>[] = [
		{
			accessorKey: 'id',
			cell: (info) => info.getValue(),
			header: () => 'ID'
		},
		{
			accessorKey: 'name',
			cell: (info) => info.getValue(),
			header: () => 'Name'
		}
	];

	const options = writable<TableOptions<Village>>({
		data: $query.data?.items!,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel()
	});
	const table = createSvelteTable(options);
</script>

{#if $query.status === 'pending'}
	<p>Still loading</p>
{/if}

{#if $query.status === 'error'}
	<p>Whoops errors</p>
{/if}

{#if $query.status === 'success'}
	<div>
		<Table {table} />
	</div>
{/if}
