import dataSource from '../../../../../../configs/db.config';

export class ProductDao {
  public async getProductList() {
    const [rows, _] = await dataSource.query(
      `SELECT 
        id, 
        name, 
        price, 
        delivery_fee AS deliveryFee, 
        image_url AS imageUrl
      FROM PRODUCT`,
      []
    );
    return rows;
  }
}
