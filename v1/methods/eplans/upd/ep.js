var data = ROFR( 'data' );

var SQL = 'sql: ';
SQL += "UPDATE wt_flat.dbo.education_plan SET ";
SQL += "name = " + SqlLiteral( data.name );
SQL += ",tech_name = " + SqlLiteral (data.tech_name);
SQL += ",access = " + SqlLiteral ( data.access );
SQL += ",expired_time = " + SqlLiteral ( data.expired_time );
SQL += ",archived = " + data.archived;
SQL += " WHERE ID = " + SqlLiteral( data.id );

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok',q: SQL }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
