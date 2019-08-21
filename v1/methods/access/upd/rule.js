var data = ROFR( 'data' );

var SQL = 'sql: ';
SQL += "UPDATE wt_flat.dbo.access_rules SET ";
SQL += "access_id = " + SqlLiteral( data.access_id );
SQL += ",catalog_id = " + SqlLiteral (data.catalog_id);
SQL += ",field_id = " + SqlLiteral (data.field_id);
SQL += ",operator_id = " + SqlLiteral (data.operator_id);
SQL += ",value = " + SqlLiteral (data.value);
SQL += ",archived = " + data.archived;
SQL += " WHERE ID = " + SqlLiteral( data.id );

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
