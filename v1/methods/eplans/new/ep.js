var data = ROFR( 'data' );
var aData = [];

aData.push( SqlLiteral( data.id ) );
aData.push( SqlLiteral( data.name ) );
aData.push( SqlLiteral ( data.tech_name ) );
aData.push( SqlLiteral ( data.access ) );

var SQL = "sql: ";
SQL += "INSERT INTO wt_flat.dbo.education_plan (id, name, tech_name, access) ";
SQL += "VALUES (" + aData.join( ',' ) + ") ";

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
