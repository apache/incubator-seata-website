import React from 'react';
import { translate } from '@docusaurus/Translate';
import './index.scss';
import useBaseUrl from '@docusaurus/useBaseUrl';

const data = {
  title: translate({ id: 'homepage.introTitle', message: 'Seata 是什么？' }),
  desc: translate({
    id: 'homepage.introDesc',
    message:
      'Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。在 Seata 开源之前，其内部版本在阿里系内部一直扮演着应用架构层数据一致性的中间件角色，帮助经济体平稳的度过历年的双11，对上层业务进行了有力的技术支撑。经过多年沉淀与积累，其商业化产品先后在阿里云、金融云上售卖。2019.1 为了打造更加完善的技术生态和普惠技术成果，Seata 正式宣布对外开源，未来 Seata 将以社区共建的形式帮助用户快速落地分布式事务解决方案。',
  }),
};

const Introduction = () => {
  return (
    <section className='introduction-section'>
      <div className='introduction-body'>
        <div className='introduction'>
          <h3>{data.title}</h3>
          <p>{data.desc}</p>
        </div>
        <img
          src={useBaseUrl('/img/index/TB1rDpkJAvoK1RjSZPfXXXPKFXa-794-478.png')}
        />
      </div>
    </section>
  );
};

export default Introduction;
