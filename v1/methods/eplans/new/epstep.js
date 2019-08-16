var data = ROFR( 'data' );
var aData = [];

aData.push( data.plan_id );
aData.push( SqlLiteral (data.name) );
aData.push( data.access );

var SQL = 'sql: ';
SQL += "INSERT INTO wt_flat.dbo.education_plan_steps (plan_id, name, access) ";
SQL += "VALUES (" + aData.split( ',' ) + ") ";

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
