var SQL = "sql: "
SQL += "DECLARE @person_id BIGINT = " + __USER__;
SQL += ";SELECT ep.name, ep.id, ep.expired_time "
SQL += "FROM group_collaborators gcs "
SQL += "JOIN wt_flat.dbo.education_plan ep ON CAST( ep.access AS VARCHAR( 500 ) ) = gcs.code "
SQL += "WHERE gcs.collaborator_id = @person_id ";

RESPONSE_OBJECT = XQuery( SQL );
