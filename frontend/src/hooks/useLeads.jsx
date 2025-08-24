
import { useState, useEffect } from 'react';
import { leadService } from '../services/leadService';
import { sampleLeads } from '../utils/sampleData';

export const useLeads = ({ page, limit, queryParams }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [ref,setRef]=useState(0)

  

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API first
        try {
        
          
          
         
         
          
          const response = await leadService.getLeads(queryParams);
          
          setLeads(response.data);
          setTotalPages(response.totalPages);
          setTotalCount(response.total);
        } catch (apiError) {
          // If API fails, use sample data with filtering
          console.warn('API failed, using sample data', apiError);
          
          let filteredLeads = sampleLeads;
          
          // Calculate pagination
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedLeads = filteredLeads.slice(startIndex, endIndex);
          
          setLeads(paginatedLeads);
          setTotalPages(Math.ceil(filteredLeads.length / limit));
          setTotalCount(filteredLeads.length);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [page, limit, queryParams,ref]);

  const refetch = async() => {
    setRef(!ref)
  };

  return {
    leads,
    loading,
    error,
    totalPages,
    totalCount,
    refetch
  };
};