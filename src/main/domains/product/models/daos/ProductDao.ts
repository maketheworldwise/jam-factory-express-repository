import dataSource from '../../../../../../configs/db.config';

export class ProductDao {
  public async getProductList(page: number, size: number) {
    // 기존 쿼리: SELECT id, name, price, delivery_fee AS deliveryFee, image_url AS imageUrl FROM PRODUCT
    // 적용 쿼리: 커버링 인덱스를 이용한 페이징 속도 개선

    // TODO: WHERE 필터링 조건 추가 필요
    const [rows, _] = await dataSource.query(
      `SELECT 
        p.id,
        p.name, 
        p.price, 
        p.delivery_fee AS deliveryFee, 
        p.image_url AS imageUrl
      FROM (SELECT id FROM PRODUCT) coverIdx JOIN PRODUCT p ON coverIdx.id = p.id
      LIMIT ? , ?`,
      [Number(page * size), Number(size)]
    );
    return rows;
  }
}
