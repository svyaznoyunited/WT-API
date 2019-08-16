var data = ROFR( 'data' );
var aData = [];

aData.push( SqlLiteral( data.name ) );
aData.push( SqlLiteral (data.tech_name) );
aData.push( data.access );


var SQL = 'sql: ';
SQL += "UPDATE wt_flat.dbo.education_plan ";
SQL += "SET (name, tech_name, access) = (" + aData.split(',') + ") ";
SQL += "WHERE ID = " + data.id;

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
