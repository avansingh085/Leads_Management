// src/services/leadService.js
import toast from 'react-hot-toast';
import { apiClient } from '../apiClient/api';
import { sampleLeads } from '../utils/sampleData';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const leadService = {
  async getLeads(filtersParams, page, limit) {
  try {
   
    const response = await apiClient.get(`/leads`, {
      params: {
        ...Object.fromEntries(filtersParams), 
        page,
        limit,
      },
    });

    console.log("Leads response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }
}
,
  async createLead(leadData) {
    try {
      const response = await apiClient.post(`/leads`, 
        leadData,
      );
      toast.success('lead created successfully!')
   return response.data;
    } catch (error) {
      // Simulate successful creation for demo purposes
      toast.error('fail to create lead!')
      console.log(error,"error during create lead")
      
    }
  },

  async updateLead(id, leadData) {
    try {
      const response = await apiClient.put(`/leads/${id}`,
       leadData,
      );
      
       toast.success('updated lead successfully!');
      return response.data;
    } catch (error) {
      toast.error('failed to upadate!');
      console.log("error during update lead",error)
    }
  },

  async deleteLead(id) {
    try {
      const response = await apiClient.delete(`/leads/${id}`);
      
       toast.success('lead deleted successfully !')
      return response.data;
    } catch (error) {
      // Simulate successful deletion for demo purposes
      toast.error('failed to delete lead!');
      await delay(500);
      return { id };
    }
  }
};