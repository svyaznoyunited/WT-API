var data = ROFR( 'data' );
var aData = [];

aData.push( data.step_edu_id );
aData.push( data.assigned_education );
aData.push( data.result_education );
aData.push( data.state );

var SQL = 'sql: ';
SQL += "UPDATE wt_flat.dbo.education_plan_result_learnings ";
SQL += "SET (step_edu_id, assigned_education, result_education, state ) (" + aData.split(',') + ") ";
SQL += "WHERE ID = " + data.id;

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
