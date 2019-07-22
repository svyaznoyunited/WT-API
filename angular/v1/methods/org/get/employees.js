/**
  Аргумент manager_id. По дефолту это текущий пользователь;
**/
function __main__() {

  var iManagerId = REQUEST.GetOptProperty( "manager_id", __USER__ );

  var qManagedSubdivision = "sql: ";
  qManagedSubdivision += "DECLARE @managerId BIGINT = " + SqlLiteral( iManagerId );
  qManagedSubdivision += "
    ;WITH UnitedCompany(id, [name]) AS (
      SELECT id, [name]
      FROM subdivisions
      WHERE org_id = 6678975295790676989
    )

    SELECT fms.[object_id] AS 'managed_subdivision'
    FROM func_managers fms
      JOIN UnitedCompany uc ON uc.id = fms.[object_id]
    WHERE fms.person_id = @managerId
  ";


  var rManagedSubdivision = XQuery( qManagedSubdivision );

  if ( ArrayCount( rManagedSubdivision ) == 0 ) {
    return { msg: "Person is not a manager", q: qManagedSubdivision };
  }

  /* Пока берём только первое упоминание :( */
  var iManagedSubdivision = String( ArrayOptFirstElem( rManagedSubdivision ).managed_subdivision )

  var qEmployees = "sql: ";
  qEmployees += "DECLARE @manageSubdivision BIGINT = " + SqlLiteral( iManagedSubdivision );
  qEmployees += "
  ;WITH Hierarchy(id, parent_id) AS (

    SELECT ss.id, parent_object_id AS 'parent_id'
    FROM subdivisions ss
    WHERE id = @manageSubdivision

    UNION ALL

    SELECT ss.id, ss.parent_object_id
    FROM subdivisions ss
      JOIN Hierarchy H ON ss.parent_object_id = H.id
  )

  SELECT CAST(cs.id AS VARCHAR) AS a
    ,cs.fullname AS b
    ,cs.position_name AS c
    ,cs.position_parent_name AS d
  FROM Hierarchy H
    JOIN collaborators cs ON cs.position_parent_id = H.id
  ";

  var rEmployees = XQuery( qEmployees );

  if ( ArrayCount( rEmployees ) < 2 ) {
    return { msg: "Person has no employees", q:[ qEmployees, qManagedSubdivision ] } ;
  }
  return rEmployees;

}

RESPONSE_OBJECT = __main__();
