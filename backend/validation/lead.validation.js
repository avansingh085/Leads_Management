class LeadValidation {
  
  validateLeadBodyData(body) {
  const errors = [];

  if (!body.first_name || typeof body.first_name !== "string") {
    errors.push("first_name is required and must be a string");
  }

  if (!body.last_name || typeof body.last_name !== "string") {
    errors.push("last_name is required and must be a string");
  }

  if (!body.email || typeof body.email !== "string") {
    errors.push("email is required and must be a string");
  }
  
  if (!body.source || !["website", "facebook_ads", "google_ads", "referral", "events", "other"].includes(body.source)) {
    errors.push("source is required and must be one of website, facebook_ads, google_ads, referral, events, other");
  }

  if (body.status && !["new", "contacted", "qualified", "lost", "won"].includes(body.status)) {
    errors.push("status must be one of new, contacted, qualified, lost, won");
  }

  if (body.score !== undefined && (isNaN(body.score) || body.score < 0 || body.score > 100)) {
    errors.push("score must be a number between 0 and 100");
  }

  if (body.lead_value !== undefined && isNaN(body.lead_value)) {
    errors.push("lead_value must be a number");
  }

  return errors.length > 0
    ? { error: errors.join(", ") }
    : { data: body };
}


  validateLeadUpdateBody(body) {
  const allowedFields = [
    "first_name",
    "last_name",
    "email",
    "phone",
    "company",
    "city",
    "state",
    "source",
    "status",
    "score",
    "lead_value",
    "last_activity_at",
    "is_qualified",
  ];

  const errors = [];

  // ensure no invalid fields are passed
  for (const key of Object.keys(body)) {
    if (!allowedFields.includes(key)) {
      errors.push(`Invalid field: ${key}`);
    }
  }

  if (body.source && !["website", "facebook_ads", "google_ads", "referral", "events", "other"].includes(body.source)) {
    errors.push("source must be one of website, facebook_ads, google_ads, referral, events, other");
  }

  if (body.status && !["new", "contacted", "qualified", "lost", "won"].includes(body.status)) {
    errors.push("status must be one of new, contacted, qualified, lost, won");
  }

  if (body.score !== undefined && (isNaN(body.score) || body.score < 0 || body.score > 100)) {
    errors.push("score must be a number between 0 and 100");
  }

  if (body.lead_value !== undefined && isNaN(body.lead_value)) {
    errors.push("lead_value must be a number");
  }

  return errors.length > 0
    ? { error: errors.join(", ") }
    : { data: body };
}

}

export default new LeadValidation();