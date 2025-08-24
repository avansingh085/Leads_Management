// src/hooks/useQueryParams.js
import { useSearchParams } from 'react-router-dom';

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const updateQueryParams = (filters) => {
   
  const params = new URLSearchParams();

  params.append('page',filters.page);

  params.append('limit',filters.limit);

  Object.entries(filters).forEach(([field, filter]) => {
    if (!filter) return;

    if (filter.operator && filter.value !== '') {
      params.append(`${field}_op`, filter.operator);
      params.append(`${field}_val`, filter.value);
    }
   
    // ranges (numbers/dates)
    if (filter.min !== undefined && filter.max !== undefined) {
      if (filter.min) params.append(`${field}_min`, filter.min);
      if (filter.max) params.append(`${field}_max`, filter.max);
    }
    if (filter.start !== undefined && filter.end !== undefined) {
      if (filter.start) params.append(`${field}_start`, filter.start);
      if (filter.end) params.append(`${field}_end`, filter.end);
    }
  });

   
 
    setSearchParams(params.toString());
  };
   console.log(Object.fromEntries(searchParams),"QUEUEUUEUEUE")
  
  return {
    queryParams: searchParams,
    updateQueryParams
  };
};