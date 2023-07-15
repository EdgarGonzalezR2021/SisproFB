export const querys = {
  getAllProducts: 'SELECT TOP(500) * FROM [italia].[dbo].[Products]',
  getProducById: 'SELECT * FROM Products Where Id = @Id',
  addNewProduct:
    'INSERT INTO [italia].[dbo].[Products] (name, description, quantity) VALUES (@name,@description,@quantity);',
  deleteProduct: 'DELETE FROM [italia].[dbo].[Products] WHERE Id= @Id',
  getTotalProducts: 'SELECT COUNT(*) FROM italia.dbo.Products',
  updateProductById:
    'UPDATE [italia].[dbo].[Products] SET Name = @name, Description = @description, Quantity = @quantity WHERE Id = @id',

  getAllEstilos: 'SELECT TOP(500) * FROM [italia].[dbo].[Estilos]',
  getEstiloById: 'SELECT * FROM Estilos Where Id = @Id',
  addNewEstilo:
    'INSERT INTO [italia].[dbo].[Estilos] (estilo, nombreestilo, linea, horma, molde, estado, fotografia, observaciones) VALUES (@estilo,@nombreestilo,@linea,@horma,@molde,@estado,@fotografia,@observaciones);',
  deleteEstilo: 'DELETE FROM [italia].[dbo].[Estilos] WHERE Id= @Id',
  getTotalEstilos: 'SELECT COUNT(*) FROM italia.dbo.Estilos',
  updateEstiloById:
    'UPDATE [italia].[dbo].[Estilos] SET Estilo = @estilo, Nombreestilo = @nombreestilo, Linea = @linea, Horma = @Horma, Molde = @Molde, Estado = @Estado, Fotografia = @Fotografia, Observaciones = @Observaciones WHERE Id = @id',
};
