import express from 'express'

import  LeadController from '../controllers/lead.controller.js';
import { verifyToken } from '../middlewares/auth.middlewares.js';

const router=express.Router();

router.use(verifyToken)
// get all lead by pagination logic pass query page, limit,filter  /api/leads/?page=x&limit=y&...filter query
router.get('/',LeadController.getAllLeads);

// create lead   /api/leads
router.post('/',LeadController.createLead);

// get by id  /api/leads/id
router.get('/:id',LeadController.getLeadById)

// update lead by id    /api/leads/id
router.put('/:id',LeadController.updateLeadById);

// delete lead by id  /api/leads/id
router.delete('/:id',LeadController.deleteById);

export default router;
