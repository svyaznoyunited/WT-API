var data = ROFR( 'data' );
var aData = [];

aData.push( SqlLiteral( data.id ) );
aData.push( SqlLiteral( data.name ) );

var SQL = "sql: ";
SQL += "INSERT INTO wt_flat.dbo.access ( id, name ) ";
SQL += "VALUES (" + aData.join( ',' ) + ") ";

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
