var data = ROFR( 'data' );

var SQL = 'sql: ';
SQL += "UPDATE wt_flat.dbo.access_rules SET ";
SQL += "access_id = " + SqlLiteral( data.access_id );
SQL += ",catalog = " + SqlLiteral (data.catalog);
SQL += ",alias = " + SqlLiteral (data.alias);
SQL += ",field = " + SqlLiteral (data.field);
SQL += ",operator = " + SqlLiteral (data.operator);
SQL += ",value = " + SqlLiteral (data.value);
SQL += ",archived = " + data.archived;
SQL += " WHERE ID = " + SqlLiteral( data.id );

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
