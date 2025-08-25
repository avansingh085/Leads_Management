import  LeadService from '../services/lead.service.js'
import  validation from '../validation/lead.validation.js';
class LeadController {
    //create new Lead 
    async createLead(req, res) {
     
        try {
            //validate body data before create show that extact error find out which data missing
            //const { data = {}, error = null } = validation.validateLeadBody(req.body);
//    console.log(data,error)
            // error text contain witch data missing 
            // if (error)
            //     return res.status(400).send({ success: false, msg: error });

            // newData contain object create new data and if get error then newData null and err not null
            const { data:newData = {}, error:err = null } = await LeadService.createLead({...req.body,id:req.user.id});

            // err during creation occur then send responce with error message
            if (err)
                return res.status(400).send({ success: false, msg: err });

            // lead successfully created then send responce with status code 201
            return res.status(201).json(newData);
        } catch (err) {
            // if unknown error occur then send 501 status code with error message
            return res.status(501).send({ success: false, msg: "invalid error" });
        }


    }

    // get all leads 
   async getAllLeads(req, res) {
  try {
    const id = req.user?.id; // userId
    
    if (!id) {
      return res.status(401).send({ success: false, msg: "Unauthorized" });
    }

    // Parse pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).send({ 
        success: false, 
        msg: "Invalid pagination parameters. Page must be >= 1, limit must be between 1-100" 
      });
    }

    // Build query object
    const query = {  id }; // Add user id filter

    // String fields
    if (req.query.email_val) {
      if (req.query.email_op === "contains") {
        query.email = { $regex: req.query.email_val, $options: "i" };
      } else if (req.query.email_op === "equals") {
        query.email = req.query.email_val;
      }
    }

    if (req.query.company_val) {
      if (req.query.company_op === "contains") {
        query.company = { $regex: req.query.company_val, $options: "i" };
      } else if (req.query.company_op === "equals") {
        query.company = req.query.company_val;
      }
    }

    if (req.query.city_val) {
      if (req.query.city_op === "contains") {
        query.city = { $regex: req.query.city_val, $options: "i" };
      } else if (req.query.city_op === "equals") {
        query.city = req.query.city_val;
      }
    }

    // Enum fields
    if (req.query.status_val) {
      if (req.query.status_op === "equals") {
        query.status = req.query.status_val;
      } else if (req.query.status_op === "in") {
        query.status = { $in: req.query.status_val.split(",") };
      }
    }

    if (req.query.source_val) {
      if (req.query.source_op === "equals") {
        query.source = req.query.source_val;
      } else if (req.query.source_op === "in") {
        query.source = { $in: req.query.source_val.split(",") };
      }
    }

    // Number fields
    if (req.query.score_val) {
      const scoreVal = Number(req.query.score_val);
      if (!isNaN(scoreVal)) {
        if (req.query.score_op === "equals") query.score = scoreVal;
        if (req.query.score_op === "gt") query.score = { $gt: scoreVal };
        if (req.query.score_op === "lt") query.score = { $lt: scoreVal };
      }
    }
    
    if (req.query.score_min || req.query.score_max) {
      query.score = query.score || {};
      if (req.query.score_min && !isNaN(req.query.score_min)) {
        query.score.$gte = Number(req.query.score_min);
      }
      if (req.query.score_max && !isNaN(req.query.score_max)) {
        query.score.$lte = Number(req.query.score_max);
      }
    }

    // Lead value field
    if (req.query.lead_value_val) {
      const leadValueVal = Number(req.query.lead_value_val);
      if (!isNaN(leadValueVal)) {
        if (req.query.lead_value_op === "equals") query.lead_value = leadValueVal;
        if (req.query.lead_value_op === "gt") query.lead_value = { $gt: leadValueVal };
        if (req.query.lead_value_op === "lt") query.lead_value = { $lt: leadValueVal };
      }
    }
    
    if (req.query.lead_value_min || req.query.lead_value_max) {
      query.lead_value = query.lead_value || {};
      if (req.query.lead_value_min && !isNaN(req.query.lead_value_min)) {
        query.lead_value.$gte = Number(req.query.lead_value_min);
      }
      if (req.query.lead_value_max && !isNaN(req.query.lead_value_max)) {
        query.lead_value.$lte = Number(req.query.lead_value_max);
      }
    }

    // Date fields
    if (req.query.created_at_val) {
      const date = new Date(req.query.created_at_val);
      if (!isNaN(date)) {
        if (req.query.created_at_op === "on") {
          const nextDay = new Date(date);
          nextDay.setDate(nextDay.getDate() + 1);
          query.created_at = { $gte: date, $lt: nextDay };
        } else if (req.query.created_at_op === "before") {
          query.created_at = { $lt: date };
        } else if (req.query.created_at_op === "after") {
          query.created_at = { $gt: date };
        }
      }
    }
    
    if (req.query.created_at_start || req.query.created_at_end) {
      query.created_at = query.created_at || {};
      if (req.query.created_at_start) {
        const startDate = new Date(req.query.created_at_start);
        if (!isNaN(startDate)) query.created_at.$gte = startDate;
      }
      if (req.query.created_at_end) {
        const endDate = new Date(req.query.created_at_end);
        if (!isNaN(endDate)) query.created_at.$lte = endDate;
      }
    }

    // Last activity date
    if (req.query.last_activity_at_val) {
      const date = new Date(req.query.last_activity_at_val);
      if (!isNaN(date)) {
        if (req.query.last_activity_at_op === "on") {
          const nextDay = new Date(date);
          nextDay.setDate(nextDay.getDate() + 1);
          query.last_activity_at = { $gte: date, $lt: nextDay };
        } else if (req.query.last_activity_at_op === "before") {
          query.last_activity_at = { $lt: date };
        } else if (req.query.last_activity_at_op === "after") {
          query.last_activity_at = { $gt: date };
        }
      }
    }

    // Boolean field
    if (req.query.is_qualified_val !== undefined && req.query.is_qualified_val !== "") {
      query.is_qualified = req.query.is_qualified_val === "true";
    }

    // Call service with pagination and filters
    const { data = [], total, totalPages, error = null } = 
      await LeadService.getAllLeads({ ...query, page, limit });

    if (error) {
      return res.status(400).send({ success: false, msg: error });
    }

    return res.status(200).send({
      data,
      total,
      totalPages,
      page,
      limit
    });
  }
  catch (err) {
    console.log(err);
    return res.status(500).send({ success: false, msg: "Internal server error" });
  }
}
    async getLeadById(req, res) {
        try {
            // extract id from params
            const id = req.params?.id;  // lead id
            const userId=req.user.id;  //user id
            // check valid formate id
            if (!id)
                return res.status(400).send({ success: false, msg: "invalid id" });
            // call service function to get data from database by using lead id
            const { lead = {}, error=null } = await LeadService.getLeadById(userId,id);

            // if error occur then send responce with status code 400 error message
            if (error) {
                return res.status(400).send({ success: false, msg: error });
            }

            // if lead data extract by id send then send in respoce with status code 200
            return res.status(200).send(lead);


        }
        catch (err) {
            // if any unknown error occure then send message with status code 501
            return res.status(501).send({ success: false, msg: "invalid error" });
        }
    }

    async updateLeadById(req, res) {

        try {
            const id = req.params?.id;

            // check valide id pass or not
            if (!id)
                return res.status(400).send({ success: false, msg: "invalid id" });
  
            // validate data come from body they correct formate or not
            const { data = {}, error = null } = validation.validateLeadUpdateBody(req.body);

           
            // when invalid data formate of updated then send error
            if (error) {

                return res.status(400).send({ success: false, msg: error });
            }
            // when call service function to upadete return two data error and updatedData
            console.log(req.user.id,id)
            const { updatedData = {}, updatedError = null } = await LeadService.updateLeadById(req.user.id,id, data);
  console.log(updatedError,updatedData)
            //when get error during update lead then send error message
            if (updatedError) {
                return res.status(400).send({ success: false, msg: updatedError});
            }
            // when lead updated success fully of given id send responce
            return res.status(200).send(updatedData);
        }
        catch (err) {
          console.log("error during update lead by id",err)
            // if unknown error occur the send responce with status code 501 error message
            return res.status(501).send({ success: false, msg: "invalid error" });
        }

    }

    // delete lead by id 
    async deleteById(req, res) {
        try {
            const id = req.params.id;

            // id data not exist 
            if (!id)
                return res.status(400).send({ success: false, msg: "invalid id" });

            // default error null if get error then assign error ruturn service function
            const { deletedLead = {}, error = null } = await LeadService.deleteById(req.user.id,id);  // delete service function excute

            // if error occure then send 400 responce
            if (error) {
                return res.status(400).send({ success: false, msg: error });
            }

            //  when deleted lead of given id then send res
            return res.status(200).send({ success: true, msg: "successfully deleted lead! " })

        }
        catch (err) {
            // when unknow error 
            console.log("error during delte lead",err)
            return res.status(500).send({ success: false, msg: "internal server error" });
        }

    }

}

export default new LeadController();