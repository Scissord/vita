import React from 'react';
import './weCertificated.css';

const AboutUsSection: React.FC = () => {
  return (
    <div className="direct flex items-end" style={{maxWidth: '1100px', margin: '0 auto' }}>
      <div className="about-us-content">
        <div className="about-us-item">
          <img src="https://manbalance.newkaz.pw/img/k_1.webp" style={{ width: '35px' }} />
          <h3 style={{ fontSize: '17px' }}>
            Мы ищем <strong className="text-[#33475b]">лучшие рецептуры</strong> по всему миру, подбираем{' '}
            лучшие производственные фармацевтические площадки, чтобы создавать для наших клиентов{' '}
            премиальные продукты по самым высоким стандартам
          </h3>
          <img src="https://manbalance.newkaz.pw/img/k_2.webp" style={{ width: '35px' }} />
        </div>
        <div className="about-us-item flex mb-10 items-center">
          <img src="https://manbalance.newkaz.pw/img/ic_ng-1.webp" style={{ width: '70px', height: '70px', marginRight: '5px' }} />
          <p style={{ color: 'black' }}>
            VitaBalance - натуральный продукт без ГМО! Заботимся о вашем здоровье - выбирайте качество и
            сбалансированный образ жизни с VitaBalance.
          </p>
        </div>
        <div className="about-us-item flex items-center">
          <img src="https://manbalance.newkaz.pw/img/registration-form-1.webp" style={{ width: '70px', height: '70px', marginRight: '5px' }} />
          <p style={{ color: 'black' }}>
            Настоящим подтверждается, что продукт Vita-Balance произведены с соблюдением принципов халяль. Мы гордимся тем,
            что наши продукты соответствует высоким стандартам халяльного питания.
          </p>
        </div>
      </div>
      <img src="https://manbalance.newkaz.pw/img/post.png" className="certif" style={{ width: '50%', height: '50%' }} />
    </div>
  );
};

export default AboutUsSection;
