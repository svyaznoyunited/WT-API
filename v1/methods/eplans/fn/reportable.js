var REQ = ROFR( 'data' )
var planids = [];
for ( planid in REQ.plan_ids.split( ',' ) ) {
  planids.push( SqlLiteral( planid ) );
}

var SQL = "sql: ";
SQL += "DECLARE @dateFrom DATE = CONVERT(DATE, " + SqlLiteral( REQ.date_from ) + ", 104) ";
SQL += "DECLARE @dateTo DATE = CONVERT(DATE, " + SqlLiteral( REQ.date_to ) + ", 104 )";
SQL += "SELECT ";
SQL += "ep.name "
SQL += ",ep.tech_name ";
SQL += ",CONCAT( wxsod.lastname, ' ', wxsod.firstname, ' ', wxsod.middlename ) AS fullname ";
SQL += ", wxsod.tab_number ";
SQL += ",wxsod.position_name ";
SQL += ",wxsod.subdivision_name ";
SQL += ",wxsod.subdivision_merch_id ";
SQL += ",ls.[name] AS 'state' ";
SQL += "FROM wt_flat.dbo.education_plan_result epr ";
SQL += "JOIN wt_flat.dbo.education_plan ep ON epr.plan_id = ep.id ";
SQL += "JOIN wt_flat.dbo.wt_x_sap_org_delta wxsod ON epr.person_id = wxsod.id ";
SQL += "JOIN wt_flat.dbo.learning_states ls ON epr.current_state = ls.id ";
SQL += "WHERE epr.plan_id IN ( " + planids.join(',') + ") ";
SQL += "AND CONVERT(DATE, epr.start_date, 104) BETWEEN @dateFrom AND @dateTo ";
SQL += REQ.allow_dis == true ? "" : "AND wxsod.is_dismiss = 0 ";

RESPONSE_OBJECT = XQuery( SQL );
