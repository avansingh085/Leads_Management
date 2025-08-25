import leadModel from "../schemas/lead.schema.js";
import mongoose from "mongoose";
class LeadService {
    // Create new lead
    async createLead(data) {
        try {
            const newLead = await leadModel.create(data);
            return { data: newLead, error: "" };
        } catch (err) {
            return { data: null, error: err.message || "Error during lead creation" };
        }
    }

    // Get all leads with pagination & filters
    async getAllLeads({ page = 1, limit = 20, ...filters }) {
        try {
            page = parseInt(page);
            limit = parseInt(limit);
            const skip = (page - 1) * limit;

            const query = { ...filters };

            const data = await leadModel.find(query).skip(skip).limit(limit);
            const total = await leadModel.countDocuments(query);
            const totalPages = Math.ceil(total / limit);

            return { data, totalPages, total, page, limit, error: "" };
        } catch (err) {
            return { data: [], error: err.message || "Error fetching leads" };
        }
    }

    // Get single lead by userId + leadId
    async getLeadById(userId, id) {
        try {
            const lead = await leadModel.findOne({ id: userId, _id: id });
            if (!lead) {
                return { lead: null, error: "Invalid lead id" };
            }
            return { lead, error: "" };
        } catch (err) {
            return { lead: null, error: err.message || "Error fetching lead" };
        }
    }

   
async updateLeadById(userId, leadId, data) {
  try {
  
   
   delete data._id;
    delete data.id;

    const updatedData = await leadModel.findOneAndUpdate(
      {
        _id: leadId,
        id:userId
      },
      { $set: data },
      { new: true }
    );

    console.log("Updated:", updatedData, "Data:", data, "UserId:", userId, "LeadId:", leadId);

    if (!updatedData) {
      return { updatedData: null, updatedError: "Failed to update lead (not found or mismatch)" };
    }

    return { updatedData, updatedError: "" };
  } catch (err) {
    return { updatedData: null, updatedError: err.message || "Error updating lead" };
  }
}

    // Delete lead by id
    async deleteById(userId, id) {
        try {
            const deletedLead = await leadModel.findOneAndDelete({ id: userId, _id: id });
            if (!deletedLead) {
                return { deletedLead: null, error: "Failed to delete lead" };
            }
            return { deletedLead, error: "" };
        } catch (err) {
            return { deletedLead: null, error: err.message || "Error deleting lead" };
        }
    }
}

export default new LeadService();
