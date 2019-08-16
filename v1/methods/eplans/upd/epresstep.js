var data = ROFR( 'data' );
var aData = [];

aData.push( data.step_id );
aData.push( data.is_complete );

var SQL = 'sql: ';
SQL += "UPDATE wt_flat.dbo.education_plan_result_steps ";
SQL += "SET (step_id, is_complete)  = (" + aData.split(',') + ") ";
SQL += "WHERE ID = " + data.id;

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
