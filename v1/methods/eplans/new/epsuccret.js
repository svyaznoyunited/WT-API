var data = ROFR( 'data' );
var aData = [];

aData.push( SqlLiteral( data.id ) );
aData.push( data.obj_id );
aData.push( SqlLiteral (data.field) );
aData.push( SqlLiteral (data.value) );


var SQL = 'sql: ';
SQL += "INSERT INTO wt_flat.dbo.education_plan_success_creteria (obj_id, field, value) ";
SQL += "VALUES (" + aData.join( ',' ) + ") "

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
