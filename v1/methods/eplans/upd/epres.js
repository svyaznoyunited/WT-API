var data = ROFR( 'data' );
var aData = [];

aData.push( data.plan_id );
aData.push( data.person_id );
aData.push( data.current_state );
aData.push( data.is_complete );

var SQL = 'sql: ';
SQL += "UPDATE wt_flat.dbo.education_plan_result ";
SQL += "SET (plan_id, person_id, current_state, is_complete) = (" + aData.split(',') + ") ";
SQL += "WHERE ID = " + data.id;

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
