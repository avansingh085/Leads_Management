
import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import LeadList from '../components/leads/LeadList';
import LeadForm from '../components/leads/LeadForm';
import LeadFilters from '../components/leads/LeadFilters';
import Pagination from '../components/common/Pagination';
import { leadService } from '../services/leadService';
//import SearchBar from '../components/common/SearchBar';
import { useLeads } from '../hooks/useLeads';
import { useQueryParams } from '../hooks/useQueryParams';

const LeadManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [modalMode, setModalMode] = useState('create');
  const [showFilters, setShowFilters] = useState(false);
  const [filt,setFilt]=useState({});
  // Get query parameters from URL
  const { queryParams, updateQueryParams } = useQueryParams();
  const page = parseInt(queryParams.get('page')) || 1;
  const limit = parseInt(queryParams.get('limit')) || 20;
  const search = queryParams.get('search') || '';
  const status = queryParams.get('status') || '';
  const source = queryParams.get('source') || '';
  
  // Fetch leads with query parameters
  const { leads, loading, error, totalPages, totalCount, refetch } = useLeads({
    page,
    limit,
    queryParams
  });

  const handleCreateLead = () => {
    setModalMode('create');
    setCurrentLead(null);
    setIsModalOpen(true);
  };

  const handleViewLead = (lead) => {
    setModalMode('view');
    setCurrentLead(lead);
    setIsModalOpen(true);
  };

  const handleEditLead = (lead) => {
    setModalMode('edit');
    setCurrentLead(lead);
    setIsModalOpen(true);
  };

  const handleDeleteLead = async (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await leadService.deleteLead(leadId);
       await refetch();
      } catch (error) {
        console.error('Failed to delete lead:', error);
      }
    }
  };

  // const handleSearch = (searchTerm) => {
  //   console.log("SEARCH")
  //   updateQueryParams({ ...Object.fromEntries(queryParams), page: 1,limit });
  // };

  const handleFilter = (filters) => {
    setFilt(filters);
    updateQueryParams({ ...Object.fromEntries(queryParams),...filters, page:1,limit });
  };

  const handlePageChange = (newPage) => {
   
    updateQueryParams({...filt,page: newPage,limit });
  };

  const handleLimitChange = (newLimit) => {
    updateQueryParams({ ...filt,limit: newLimit, page: 1 });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
            <p className="text-gray-600 mt-2">
              {totalCount} {totalCount === 1 ? 'lead' : 'leads'} found
            </p>
          </div>
          <button
            onClick={handleCreateLead}
            className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors"
          >
            <FaPlus className="text-sm" />
            <span>Add New Lead</span>
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* <SearchBar onSearch={handleSearch} initialValue={search} /> */}
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-gray-700 hover:text-black"
              >
                <FaFilter />
                <span>Filters</span>
              </button>
              
              <select
                value={limit}
                onChange={(e) => handleLimitChange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
                <option value="50">50 per page</option>
              </select>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <LeadFilters onFilter={handleFilter} initialFilters={{}} />
            </div>
          )}
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <div className="animate-pulse text-gray-600">Loading leads...</div>
          </div>
        )}
        
        {error && (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <div className="text-red-600">Error: {error.message}</div>
            <button 
              onClick={refetch}
              className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Leads Table */}
        {!loading && !error && (
          <>
            <LeadList 
              leads={leads} 
              onView={handleViewLead}
              onEdit={handleEditLead}
              onDelete={handleDeleteLead}
            />
            
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      {/* Modal for Create/View/Edit */}
      {isModalOpen && (
        <LeadForm
          mode={modalMode}
          lead={currentLead}
          onClose={() => setIsModalOpen(false)}
          onSave={ async() => {
            
            setIsModalOpen(false);
             
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default LeadManagement;