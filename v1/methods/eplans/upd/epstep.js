var data = ROFR( 'data' );

var SQL = 'sql: ';
SQL += "UPDATE wt_flat.dbo.education_plan_steps SET ";
SQL += "plan_id = " + SqlLiteral( data.plan_id );
SQL += ",name = " + SqlLiteral( data.name );
SQL += ",access = " + SqlLiteral ( data.access );
SQL += ",archived = " + data.archived;
SQL += " WHERE ID = " + SqlLiteral( data.id );

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
