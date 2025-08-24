
import React, { useState } from 'react';

const LeadFilters = ({ onFilter, initialFilters }) => {
  const [filters, setFilters] = useState({
    
    // String fields
    email: initialFilters.email || { operator: 'contains', value: '' },
    company: initialFilters.company || { operator: 'contains', value: '' },
    city: initialFilters.city || { operator: 'contains', value: '' },
    
    // Enum fields - simplified handling
    status: initialFilters.status || { operator: 'equals', value: '' },
    source: initialFilters.source || { operator: 'equals', value: '' },
    
    // Number fields
    score: initialFilters.score || { operator: 'equals', value: '' },
    lead_value: initialFilters.lead_value || { operator: 'equals', value: '' },
    
    // Date fields
    created_at: initialFilters.created_at || { operator: 'on', value: '' },
    last_activity_at: initialFilters.last_activity_at || { operator: 'on', value: '' },
    
    // Boolean field
    is_qualified: initialFilters.is_qualified || { operator: 'equals', value: '' },
    
    // Range filters for numbers and dates
    score_range: initialFilters.score_range || { min: '', max: '' },
    lead_value_range: initialFilters.lead_value_range || { min: '', max: '' },
    date_range: initialFilters.date_range || { start: '', end: '' }
  });

  const handleFilterChange = (field, key, value) => {
    const newFilters = { 
      ...filters, 
      [field]: { ...filters[field], [key]: value }
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleRangeChange = (field, rangeKey, value) => {
    const newFilters = { 
      ...filters, 
      [field]: { ...filters[field], [rangeKey]: value }
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      email: { operator: 'contains', value: '' },
      company: { operator: 'contains', value: '' },
      city: { operator: 'contains', value: '' },
      status: { operator: 'equals', value: '' },
      source: { operator: 'equals', value: '' },
      score: { operator: 'equals', value: '' },
      lead_value: { operator: 'equals', value: '' },
      created_at: { operator: 'on', value: '' },
      last_activity_at: { operator: 'on', value: '' },
      is_qualified: { operator: 'equals', value: '' },
      score_range: { min: '', max: '' },
      lead_value_range: { min: '', max: '' },
      date_range: { start: '', end: '' }
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  const renderStringFilter = (field, label) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <select
        value={filters[field].operator}
        onChange={(e) => handleFilterChange(field, 'operator', e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
      >
        <option value="contains">Contains</option>
        <option value="equals">Equals</option>
      </select>
      <input
        type="text"
        value={filters[field].value}
        onChange={(e) => handleFilterChange(field, 'value', e.target.value)}
        placeholder={`Filter ${label}...`}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
      />
    </div>
  );

  const renderEnumFilter = (field, label, options) => {
    const isMultiple = filters[field].operator === 'in';

    return (
      <div className="space-y-2">
        <select
          value={filters[field].operator}
          onChange={(e) => handleFilterChange(field, 'operator', e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
        >
          <option value="equals">Equals</option>
          <option value="in">In (multiple)</option>
        </select>
        
        {isMultiple ? (
          <div>
            <select
              multiple
              value={filters[field].value ? filters[field].value.split(',') : []}
              onChange={(e) => {
                const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                handleFilterChange(field, 'value', selectedValues.join(','));
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm h-24"
            >
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {filters[field].value && (
              <div className="mt-1 text-xs text-gray-600">
                Selected: {filters[field].value.split(',').length}
              </div>
            )}
          </div>
        ) : (
          <select
            value={filters[field].value}
            onChange={(e) => handleFilterChange(field, 'value', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
          >
            <option value="">All {label}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  };

  const renderNumberFilter = (field, label) => (
    <div className="space-y-2">
      <select
        value={filters[field].operator}
        onChange={(e) => handleFilterChange(field, 'operator', e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
      >
        <option value="equals">Equals</option>
        <option value="gt">Greater than</option>
        <option value="lt">Less than</option>
        <option value="between">Between</option>
      </select>
      
      {filters[field].operator === 'between' ? (
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            min={0}
             max={100}
            value={filters[`${field}_range`].min}
            onChange={(e) => handleRangeChange(`${field}_range`, 'min', e.target.value)}
            placeholder="Min"
           
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
          <input
            type="number"
            min={0}
             max={100}
            value={filters[`${field}_range`].max}
            onChange={(e) => handleRangeChange(`${field}_range`, 'max', e.target.value)}
            placeholder="Max"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
        </div>
      ) : (
        <input
          type="number"
          min={0}
             max={100}
          value={filters[field].value}
          onChange={(e) => handleFilterChange(field, 'value', e.target.value)}
          placeholder={`Filter ${label}...`}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
        />
      )}
    </div>
  );

  const renderDateFilter = (field, label) => (
    <div className="space-y-2">
      <select
        value={filters[field].operator}
        onChange={(e) => handleFilterChange(field, 'operator', e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
      >
        <option value="on">On</option>
        <option value="before">Before</option>
        <option value="after">After</option>
        <option value="between">Between</option>
      </select>
      
      {filters[field].operator === 'between' ? (
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            value={filters.date_range.start}
            onChange={(e) => handleRangeChange('date_range', 'start', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
          <input
            type="date"
            value={filters.date_range.end}
            onChange={(e) => handleRangeChange('date_range', 'end', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
        </div>
      ) : (
        <input
          type="date"
          value={filters[field].value}
          onChange={(e) => handleFilterChange(field, 'value', e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
        />
      )}
    </div>
  );

  const renderBooleanFilter = (field, label) => (
    <select
      value={filters[field].value}
      onChange={(e) => handleFilterChange(field, 'value', e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
    >
      <option value="">All</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
  );

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'won', label: 'Won' },
    { value: 'lost', label: 'Lost' }
  ];

  const sourceOptions = [
    { value: 'website', label: 'Website' },
    { value: 'facebook_ads', label: 'Facebook Ads' },
    { value: 'google_ads', label: 'Google Ads' },
    { value: 'referral', label: 'Referral' },
    { value: 'events', label: 'Events' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Filter Leads</h3>
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
        >
          Clear All Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* String Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          {renderStringFilter('email', 'email')}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
          {renderStringFilter('company', 'company')}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          {renderStringFilter('city', 'city')}
        </div>

        {/* Enum Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          {renderEnumFilter('status', 'Status', statusOptions)}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
          {renderEnumFilter('source', 'Source', sourceOptions)}
        </div>

        {/* Number Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Score</label>
          {renderNumberFilter('score', 'score')}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lead Value</label>
          {renderNumberFilter('lead_value', 'lead value')}
        </div>

        {/* Date Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Created At</label>
          {renderDateFilter('created_at', 'created date')}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Activity</label>
          {renderDateFilter('last_activity_at', 'last activity')}
        </div>

        {/* Boolean Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Qualified</label>
          {renderBooleanFilter('is_qualified', 'qualified')}
        </div>
      </div>
    </div>
  );
};

export default LeadFilters;