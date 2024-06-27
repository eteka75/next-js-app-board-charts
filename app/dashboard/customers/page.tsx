import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const customers = await fetchFilteredCustomers(query);

  return (
    <div>
     <CustomersTable customers ={customers}  />
    </div>
  )
}
