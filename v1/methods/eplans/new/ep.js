var data = ROFR( 'data' );
var aData = [];

aData.push( SqlLiteral( data.name ) );
aData.push( SqlLiteral (data.tech_name) );
aData.push( data.access );

var SQL = "sql: ";
SQL += "INSERT INTO wt_flat.dbo.education_plan (name, tech_name, access) ";
SQL += "VALUES (" + aData.split( ',' ) + ") ";

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
