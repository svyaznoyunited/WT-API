var data = ROFR( 'data' );
var aData = [];

aData.push( SqlLiteral( data.id ) );
aData.push( data.plan_id );
aData.push( data.person_id );
aData.push( data.current_state );
aData.push( data.is_complete );


var SQL = 'sql: ';
SQL += "INSERT INTO wt_flat.dbo.education_plan_result (plan_id, person_id, current_state, is_complete) ";
SQL += "VALUES (" + aData.join( ',' ) + ") ";

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
