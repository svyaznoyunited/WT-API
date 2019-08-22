var data = ROFR( 'data' );
var aData = [];

aData.push( SqlLiteral( data.id ) );
aData.push( SqlLiteral( data.access_id ) );
aData.push( SqlLiteral( data.catalog_id ) );
aData.push( SqlLiteral ( data.field_id ) );
aData.push( SqlLiteral ( data.operator_id ) );
aData.push( SqlLiteral ( data.value ) );

var SQL = "sql: ";
SQL += "INSERT INTO wt_flat.dbo.access_rules (id, access_id, [catalog_id], field_id, operator_id, [value] ) ";
SQL += "VALUES (" + aData.join( ',' ) + ") ";

if ( COMMITINSERT( SQL ) ) {
  RESPONSE_OBJECT = { result: 'ok' }
} else {
  RESPONSE_OBJECT = { result: 'neok' }
}
