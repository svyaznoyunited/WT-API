var data = ROFR( 'data' );

var SQL = 'sql: ';
SQL += "UPDATE wt_flat.dbo.education_plan_step_learnings SET ";
SQL += "step_id = " + SqlLiteral( data.step_id )
SQL += ",education_id = " + data.education_id
SQL += ",education_type = " + SqlLiteral (data.education_type)
SQL += ",expired_time = " + SqlLiteral ( data.expired_time );
SQL += ",access = " + SqlLiteral ( data.access );
SQL += ",archived = " + data.archived;
SQL += " WHERE ID = " + SqlLiteral( data.id );

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
