var SQL = "sql: "
SQL += "DECLARE @person_id BIGINT = " + __USER__;
SQL += ";SELECT ep.name, epr.id, epr.expire_date "
SQL += "FROM group_collaborators gcs "
SQL += "JOIN wt_flat.dbo.education_plan ep ON CAST( ep.access AS VARCHAR( 500 ) ) = gcs.code "
SQL += "JOIN wt_flat.dbo.education_plan_result epr ON ep.id = epr.plan_id "
SQL += "WHERE gcs.collaborator_id = @person_id ";

RESPONSE_OBJECT = XQuery( SQL );
