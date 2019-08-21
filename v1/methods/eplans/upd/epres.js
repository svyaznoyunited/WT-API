var data = ROFR( 'data' );

var SQL = 'sql: ';
SQL += "UPDATE wt_flat.dbo.education_plan_result SET ";
SQL += 'plan_id = ' + data.plan_id
SQL += ',person_id = ' + data.person_id
SQL += ',current_state = ' + data.current_state
SQL += ',is_complete = ' + data.is_complete
SQL += " WHERE ID = " + data.id;

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
