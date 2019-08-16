var data = ROFR( 'data' );
var aData = [];

aData.push( data.obj_id );
aData.push( SqlLiteral (data.field) );
aData.push( SqlLiteral (data.value) );


var SQL = 'sql: ';
SQL += "UPDATE wt_flat.dbo.education_plan_success_creteria ";
SQL += "SET (obj_id, field, value) = (" + aData.split(',') + ") ";
SQL += "WHERE ID = " + data.id;

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
