var data = ROFR( 'data' );
var aData = [];

aData.push( SqlLiteral( data.id ) );
aData.push( SqlLiteral( data.step_id ) );
aData.push( data.education_id );
aData.push( SqlLiteral (data.education_type) );
aData.push( SqlLiteral ( data.access ) );

var SQL = 'sql: ';
SQL += "INSERT INTO wt_flat.dbo.education_plan_step_learnings (id, step_id, education_id, education_type, access) ";
SQL += "VALUES (" + aData.join( ',' ) + ") ";

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
