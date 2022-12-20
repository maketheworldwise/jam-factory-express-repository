import dataSource from '../../../../../../configs/db.config';

export class ProductDao {
  public async getProductList(page: number, size: number) {
    // 커버링 인덱스

    const [rows, _] = await dataSource.query(
      `SELECT 
        p.id,
        p.name, 
        p.price, 
        p.delivery_fee AS deliveryFee, 
        p.image_url AS imageUrl
      FROM (SELECT id FROM PRODUCT) coverIdx 
        JOIN PRODUCT p ON coverIdx.id = p.id
      LIMIT ? , ?`,
      [page * size, size]
    );

    return rows;
  }

  public async getProduct(productId: number) {
    const [rows, _] = await dataSource.query(
      `SELECT
        id,
        name,
        price,
        delivery_fee AS deliveryFee,
        image_url AS imageUrl
      FROM PRODUCT
      WHERE id = ?`,
      [productId]
    );

    return rows;
  }
}
