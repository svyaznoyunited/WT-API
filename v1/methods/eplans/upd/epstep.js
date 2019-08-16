var data = ROFR( 'data' );
var aData = [];

aData.push( data.plan_id );
aData.push( SqlLiteral (data.name) );
aData.push( data.access );

var SQL = 'sql: ';
SQL += "UPDATE dbo.education_plan_steps ";
SQL += "SET (plan_id, name, access)  = (" + aData.split(',') + ") ";
SQL += "WHERE ID = " + data.id;

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
