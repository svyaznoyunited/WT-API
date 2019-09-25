var SQL = "sql: ";
SQL += "DECLARE @person_id BIGINT = " + __USER__;
SQL += ";SELECT ep.name, epr.id, epr.expire_date, epr.current_state ";
SQL += "FROM wt_flat.dbo.education_plan_result epr ";
SQL += "JOIN wt_flat.dbo.education_plan ep ON epr.plan_id = ep.id ";
SQL += "WHERE epr.person_id = @person_id ";
SQL += "ORDER BY current_state ASC";

RESPONSE_OBJECT = XQuery( SQL );
