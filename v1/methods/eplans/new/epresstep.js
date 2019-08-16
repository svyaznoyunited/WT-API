var data = ROFR( 'data' );
var aData = [];

aData.push( data.step_id );
aData.push( data.is_complete );

var SQL = 'sql: ';
SQL += "INSERT INTO wt_flat.dbo.education_plan_result_steps (step_id, is_complete) ";
SQL += "VALUES (" + aData.split( ',' ) + ") ";

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
