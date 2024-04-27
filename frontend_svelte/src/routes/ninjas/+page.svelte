<script lang="ts">
	import LinkButton from '$lib/components/built/link-button.svelte';
	import Table from '$lib/components/built/table.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import useGetNinjas from '$lib/fetchers/useGetNinjas';
	import type { Ninjas } from '$lib/types/ninjas';
	import type { Paginated } from '$lib/types/paginated';
	import { createQuery } from '@tanstack/svelte-query';
	import {
		createSvelteTable,
		getCoreRowModel,
		type ColumnDef,
		type TableOptions
	} from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';

	const query = createQuery<Paginated<Ninjas>, Error>(useGetNinjas);
	const defaultColumns: ColumnDef<Ninjas>[] = [
		{
			accessorKey: 'id',
			header: () => 'ID'
		},
		{
			accessorKey: 'name',
			header: () => 'Name'
		},
		{
			accessorKey: 'village.name',
			// cell: (info) => <LinkButton village={info.row.original.village} />,
			cell: function (info) {
				return <LinkButton village={info.row.original.village}></LinkButton>;
			},
			header: () => 'Village'
		}
	];

	const options = writable<TableOptions<Ninjas>>({
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
	<LinkButton village={$query.data.items[0].village} />
	<Table {table} />
{/if}
