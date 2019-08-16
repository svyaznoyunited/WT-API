var data = ROFR( 'data' );
var aData = [];

aData.push( SqlLiteral( data.id ) );
aData.push( data.step_edu_id );
aData.push( data.assigned_education );
aData.push( data.result_education );
aData.push( data.state );

var SQL = 'sql: ';
SQL += "INSERT INTO wt_flat.dbo.education_plan_result_learnings (step_edu_id, assigned_education, result_education, state ) ";
SQL += "VALUES (" + aData.split( ',' ) + ") ";

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
