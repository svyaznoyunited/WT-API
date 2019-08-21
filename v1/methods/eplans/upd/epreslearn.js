var data = ROFR( 'data' );

var SQL = 'sql: ';
SQL += "UPDATE wt_flat.dbo.education_plan_result_learnings SET ";
SQL += "step_edu_id = " + data.step_edu_id
SQL += ",assigned_education = " + data.assigned_education
SQL += ",result_education = " + data.result_education
SQL += ",state = " + data.state
SQL += " WHERE ID = " + data.id;

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
