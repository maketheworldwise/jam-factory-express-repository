import dataSource from '../../../../../../configs/db.config';

export class ProductDao {
  public async getProductList(
    category: string,
    sort: string,
    page: number,
    size: number
  ) {
    const sortby = sort.replace('.', ' ');

    // 커버링 인덱스
    // 특정 카테고리를 지정하여 처리할 수 있으나
    // 쿼리 분기 처리로 인한 코드량을 조금이나마 줄이기 위해 LIKE문 활용

    const [rows, _] = await dataSource.query(
      `SELECT 
        p.id,
        p.category,
        p.name, 
        p.price, 
        p.delivery_fee AS deliveryFee, 
        p.image_url AS imageUrl
      FROM (
        SELECT id 
        FROM PRODUCT 
        WHERE category LIKE ?
      ) coverIdx 
        JOIN PRODUCT p ON coverIdx.id = p.id
        ORDER BY ${sortby}
      LIMIT ? , ?`,
      [category, page * size, size]
    );

    return rows;
  }

  public async getProduct(productId: number) {
    const [rows, _] = await dataSource.query(
      `SELECT
        id,
        category,
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
